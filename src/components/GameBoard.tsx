'use client';

import { useState, useCallback, useEffect } from 'react';
import { Chess, Square, Move } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { BOARD_COLORS } from '@/lib/constants';
import { getLegalMoves, getGameStatus } from '@/lib/chess-utils';

interface GameBoardProps {
  onMoveChange?: (history: Move[], fen: string) => void;
  onStatusChange?: (status: ReturnType<typeof getGameStatus>) => void;
  boardOrientation?: 'white' | 'black';
  externalGame?: Chess;
  onGameChange?: (game: Chess) => void;
}

export default function GameBoard({
  onMoveChange,
  onStatusChange,
  boardOrientation = 'white',
  externalGame,
  onGameChange,
}: GameBoardProps) {
  const [internalGame] = useState(() => new Chess());
  const game = externalGame || internalGame;
  const [, setUpdateTrigger] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

  // Force re-render when external game changes
  useEffect(() => {
    if (externalGame) {
      setUpdateTrigger(n => n + 1);
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }, [externalGame?.fen()]);

  const getSquareStyles = useCallback(() => {
    const styles: Record<string, React.CSSProperties> = {};

    if (lastMove) {
      styles[lastMove.from] = { background: BOARD_COLORS.lastMove };
      styles[lastMove.to] = { background: BOARD_COLORS.lastMove };
    }

    if (selectedSquare) {
      styles[selectedSquare] = { background: BOARD_COLORS.highlight };
    }

    legalMoves.forEach(square => {
      const piece = game.get(square);
      styles[square] = {
        background: piece ? BOARD_COLORS.legalCapture : BOARD_COLORS.legalMove,
        borderRadius: piece ? '0' : '50%',
      };
    });

    return styles;
  }, [selectedSquare, legalMoves, lastMove, game]);

  const handleMove = useCallback((from: Square, to: Square): boolean => {
    try {
      const move = game.move({ from, to, promotion: 'q' });
      if (move) {
        setLastMove({ from, to });
        setUpdateTrigger(n => n + 1);
        onMoveChange?.(game.history({ verbose: true }), game.fen());
        onGameChange?.(game);

        const status = getGameStatus(game);
        onStatusChange?.(status);

        return true;
      }
    } catch {
      // Invalid move
    }
    return false;
  }, [game, onMoveChange, onStatusChange, onGameChange]);

  const onDrop = useCallback(({ sourceSquare, targetSquare }: {
    piece: { isSparePiece: boolean; position: string; pieceType: string };
    sourceSquare: string;
    targetSquare: string | null;
  }): boolean => {
    if (!targetSquare) return false;
    const result = handleMove(sourceSquare as Square, targetSquare as Square);
    setSelectedSquare(null);
    setLegalMoves([]);
    return result;
  }, [handleMove]);

  const onSquareClick = useCallback(({ square }: { piece: { pieceType: string } | null; square: string }) => {
    const sq = square as Square;
    if (selectedSquare && legalMoves.includes(sq)) {
      handleMove(selectedSquare, sq);
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    const piece = game.get(sq);
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(sq);
      setLegalMoves(getLegalMoves(game, sq));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }, [selectedSquare, legalMoves, game, handleMove]);

  const onPieceDrag = useCallback(({ square }: { isSparePiece: boolean; piece: { pieceType: string }; square: string | null }) => {
    if (square) {
      setLegalMoves(getLegalMoves(game, square as Square));
    }
  }, [game]);

  return (
    <div className="w-full max-w-[600px] aspect-square relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
      <div
        className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-border select-none"
        style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Chessboard
          options={{
            position: game.fen(),
            onPieceDrop: onDrop,
            boardOrientation: boardOrientation,
            squareStyles: getSquareStyles(),
            boardStyle: { borderRadius: '0' },
            darkSquareStyle: { backgroundColor: BOARD_COLORS.dark },
            lightSquareStyle: { backgroundColor: BOARD_COLORS.light },
            allowDragging: true,
          }}
        />
      </div>
    </div>
  );
}
