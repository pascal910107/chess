'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
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
  const [hintSquares, setHintSquares] = useState<string[]>([]);
  const [hintSource, setHintSource] = useState<string | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPressing = useRef(false);

  const LONG_PRESS_DURATION = 400;

  // Force re-render when external game changes
  useEffect(() => {
    if (externalGame) {
      setUpdateTrigger(n => n + 1);
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }, [externalGame?.fen()]);

  // Cleanup long press timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  // Calculate which square is at a given position
  const getSquareFromPosition = useCallback((clientX: number, clientY: number): Square | null => {
    if (!boardRef.current) return null;

    const rect = boardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const squareSize = rect.width / 8;
    let col = Math.floor(x / squareSize);
    let row = Math.floor(y / squareSize);

    // Adjust for board orientation
    if (boardOrientation === 'black') {
      col = 7 - col;
      row = 7 - row;
    }

    if (col < 0 || col > 7 || row < 0 || row > 7) return null;

    const file = String.fromCharCode('a'.charCodeAt(0) + col);
    const rank = 8 - row;

    return `${file}${rank}` as Square;
  }, [boardOrientation]);

  // Handle long press start
  const handlePressStart = useCallback((clientX: number, clientY: number) => {
    const square = getSquareFromPosition(clientX, clientY);
    if (!square) return;

    const piece = game.get(square);
    if (!piece) return;

    longPressTimer.current = setTimeout(() => {
      isLongPressing.current = true;
      const moves = getLegalMoves(game, square);
      setHintSquares(moves);
      setHintSource(square);
    }, LONG_PRESS_DURATION);
  }, [getSquareFromPosition, game, LONG_PRESS_DURATION]);

  // Handle long press end
  const handlePressEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (isLongPressing.current) {
      isLongPressing.current = false;
      setHintSquares([]);
      setHintSource(null);
    }
  }, []);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handlePressStart(e.clientX, e.clientY);
  }, [handlePressStart]);

  const handleMouseUp = useCallback(() => {
    handlePressEnd();
  }, [handlePressEnd]);

  const handleMouseLeave = useCallback(() => {
    handlePressEnd();
  }, [handlePressEnd]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      handlePressStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handlePressStart]);

  const handleTouchEnd = useCallback(() => {
    handlePressEnd();
  }, [handlePressEnd]);

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

    // 長按提示合法走法
    hintSquares.forEach(square => {
      const hasPiece = game.get(square as Square);
      styles[square] = {
        ...styles[square],
        background: hasPiece
          ? 'radial-gradient(circle, transparent 60%, rgba(20, 184, 166, 0.7) 61%)'
          : 'radial-gradient(circle, rgba(20, 184, 166, 0.6) 25%, transparent 25%)',
      };
    });

    // 長按時標記來源格
    if (hintSource) {
      styles[hintSource] = {
        ...styles[hintSource],
        background: 'rgba(20, 184, 166, 0.5)',
      };
    }

    return styles;
  }, [selectedSquare, legalMoves, lastMove, game, hintSquares, hintSource]);

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
    setHintSquares([]);
    setHintSource(null);
    return result;
  }, [handleMove]);

  const onSquareClick = useCallback(({ square }: { piece: { pieceType: string } | null; square: string }) => {
    const sq = square as Square;
    if (selectedSquare && legalMoves.includes(sq)) {
      handleMove(selectedSquare, sq);
      setSelectedSquare(null);
      setLegalMoves([]);
      setHintSquares([]);
      setHintSource(null);
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
        ref={boardRef}
        className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-border select-none"
        style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Chessboard
          options={{
            position: game.fen(),
            onPieceDrop: onDrop,
            onSquareClick: onSquareClick,
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
