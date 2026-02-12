'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Chess, Square, Move } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { BOARD_COLORS } from '@/lib/constants';
import { getLegalMoves, getGameStatus } from '@/lib/chess-utils';

interface ChessBoardProps {
  initialFen?: string;
  onMove?: (move: Move) => void;
  onGameEnd?: (status: ReturnType<typeof getGameStatus>) => void;
  showLegalMoves?: boolean;
  highlightSquares?: string[];
  allowMoves?: boolean;
  boardOrientation?: 'white' | 'black';
}

export default function ChessBoard({
  initialFen,
  onMove,
  onGameEnd,
  showLegalMoves = true,
  highlightSquares = [],
  allowMoves = true,
  boardOrientation = 'white',
}: ChessBoardProps) {
  const [game, setGame] = useState(() => new Chess(initialFen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [hintSquares, setHintSquares] = useState<string[]>([]);
  const [hintSource, setHintSource] = useState<string | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPressing = useRef(false);

  const LONG_PRESS_DURATION = 400;

  // Reset game when initialFen changes
  useEffect(() => {
    const newGame = new Chess(initialFen);
    setGame(newGame);
    setSelectedSquare(null);
    setLegalMoves([]);
    setLastMove(null);
  }, [initialFen]);

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

  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};

    // 標記最後移動
    if (lastMove) {
      styles[lastMove.from] = { background: BOARD_COLORS.lastMove };
      styles[lastMove.to] = { background: BOARD_COLORS.lastMove };
    }

    // 標記選中的格子
    if (selectedSquare) {
      styles[selectedSquare] = { background: BOARD_COLORS.highlight };
    }

    // 標記合法走步
    if (showLegalMoves && legalMoves.length > 0) {
      legalMoves.forEach(square => {
        const piece = game.get(square);
        styles[square] = {
          background: piece ? BOARD_COLORS.legalCapture : BOARD_COLORS.legalMove,
          borderRadius: piece ? '0' : '50%',
        };
      });
    }

    // 標記教學高亮格
    highlightSquares.forEach(square => {
      styles[square] = {
        background: 'rgba(20, 184, 166, 0.5)',
        ...styles[square],
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
  }, [selectedSquare, legalMoves, lastMove, highlightSquares, showLegalMoves, game, hintSquares, hintSource]);

  const makeMove = useCallback((from: Square, to: Square): Move | null => {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({ from, to, promotion: 'q' }); // 自動升變為皇后

      if (move) {
        setGame(gameCopy);
        setLastMove({ from, to });
        onMove?.(move);

        // 檢查遊戲狀態
        const status = getGameStatus(gameCopy);
        if (status.status !== 'playing') {
          onGameEnd?.(status);
        }

        return move;
      }
    } catch {
      // 非法走步
    }
    return null;
  }, [game, onMove, onGameEnd]);

  const onSquareClick = useCallback(({ square }: { piece: { pieceType: string } | null; square: string }) => {
    if (!allowMoves) return;

    const sq = square as Square;

    // 如果點擊的是合法移動目標
    if (selectedSquare && legalMoves.includes(sq)) {
      const move = makeMove(selectedSquare, sq);
      if (move) {
        setSelectedSquare(null);
        setLegalMoves([]);
        setHintSquares([]);
        setHintSource(null);
        return;
      }
    }

    // 選擇新的棋子
    const piece = game.get(sq);
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(sq);
      setLegalMoves(getLegalMoves(game, sq));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }, [selectedSquare, legalMoves, game, allowMoves, makeMove]);

  const onDrop = useCallback(({ sourceSquare, targetSquare }: {
    piece: { isSparePiece: boolean; position: string; pieceType: string };
    sourceSquare: string;
    targetSquare: string | null;
  }): boolean => {
    if (!allowMoves || !targetSquare) return false;
    const move = makeMove(sourceSquare as Square, targetSquare as Square);
    setSelectedSquare(null);
    setLegalMoves([]);
    setHintSquares([]);
    setHintSource(null);
    return move !== null;
  }, [allowMoves, makeMove]);

  const onPieceDrag = useCallback(({ square }: { isSparePiece: boolean; piece: { pieceType: string }; square: string | null }) => {
    if (showLegalMoves && square) {
      setLegalMoves(getLegalMoves(game, square as Square));
    }
  }, [game, showLegalMoves]);

  return (
    <div className="w-full max-w-[600px] relative group">
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
            onPieceDrag: onPieceDrag,
            boardOrientation: boardOrientation,
            squareStyles: customSquareStyles,
            boardStyle: { borderRadius: '0' },
            darkSquareStyle: { backgroundColor: BOARD_COLORS.dark },
            lightSquareStyle: { backgroundColor: BOARD_COLORS.light },
            allowDragging: allowMoves,
          }}
        />
      </div>
    </div>
  );
}

// Export a hook for external control
export function useChessGame(initialFen?: string) {
  const [game, setGame] = useState(() => new Chess(initialFen));
  const [history, setHistory] = useState<Move[]>([]);

  const makeMove = useCallback((from: Square, to: Square, promotion?: string): Move | null => {
    try {
      const move = game.move({ from, to, promotion: promotion || 'q' });
      if (move) {
        setHistory(game.history({ verbose: true }));
        return move;
      }
    } catch {
      // Invalid move
    }
    return null;
  }, [game]);

  const undo = useCallback(() => {
    game.undo();
    setHistory(game.history({ verbose: true }));
  }, [game]);

  const reset = useCallback((fen?: string) => {
    if (fen) {
      game.load(fen);
    } else {
      game.reset();
    }
    setHistory([]);
  }, [game]);

  return {
    game,
    history,
    makeMove,
    undo,
    reset,
    fen: game.fen(),
    turn: game.turn(),
    status: getGameStatus(game),
  };
}
