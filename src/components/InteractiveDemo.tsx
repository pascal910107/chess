'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { BOARD_COLORS } from '@/lib/constants';
import { CheckCircle, XCircle } from 'lucide-react';

interface InteractiveDemoProps {
  fen: string;
  highlightSquares?: string[];
  allowMoves?: boolean;
  practiceTargets?: string[];
  onCorrectMove?: () => void;
  description?: string;
}

const LONG_PRESS_DURATION = 400; // ms

export default function InteractiveDemo({
  fen,
  highlightSquares = [],
  allowMoves = false,
  practiceTargets = [],
  onCorrectMove,
  description,
}: InteractiveDemoProps) {
  const [game, setGame] = useState(() => new Chess(fen));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [hintSquares, setHintSquares] = useState<string[]>([]);
  const [hintSource, setHintSource] = useState<string | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPressing = useRef(false);

  // Calculate which square is at a given position
  const getSquareFromPosition = useCallback((clientX: number, clientY: number): Square | null => {
    if (!boardRef.current) return null;

    const rect = boardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const squareSize = rect.width / 8;
    const col = Math.floor(x / squareSize);
    const row = Math.floor(y / squareSize);

    if (col < 0 || col > 7 || row < 0 || row > 7) return null;

    const file = String.fromCharCode('a'.charCodeAt(0) + col);
    const rank = 8 - row;

    return `${file}${rank}` as Square;
  }, []);

  // Get legal moves for a square
  const getLegalMoves = useCallback((square: Square): string[] => {
    const moves = game.moves({ square, verbose: true });
    return moves.map(move => move.to);
  }, [game]);

  // Handle long press start
  const handlePressStart = useCallback((clientX: number, clientY: number) => {
    const square = getSquareFromPosition(clientX, clientY);
    if (!square) return;

    const piece = game.get(square);
    if (!piece) return;

    longPressTimer.current = setTimeout(() => {
      isLongPressing.current = true;
      const legalMoves = getLegalMoves(square);
      setHintSquares(legalMoves);
      setHintSource(square);
    }, LONG_PRESS_DURATION);
  }, [getSquareFromPosition, game, getLegalMoves]);

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
      handlePressStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handlePressStart]);

  const handleTouchEnd = useCallback(() => {
    handlePressEnd();
  }, [handlePressEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};

    highlightSquares.forEach(square => {
      styles[square] = {
        background: BOARD_COLORS.highlight,
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
      };
    });

    // Highlight hint squares (legal moves on long press)
    hintSquares.forEach(square => {
      const hasPiece = game.get(square as Square);
      styles[square] = {
        ...styles[square],
        background: hasPiece
          ? 'radial-gradient(circle, transparent 60%, rgba(20, 184, 166, 0.7) 61%)'
          : 'radial-gradient(circle, rgba(20, 184, 166, 0.6) 25%, transparent 25%)',
      };
    });

    // Highlight the source square during long press
    if (hintSource) {
      styles[hintSource] = {
        ...styles[hintSource],
        background: 'rgba(20, 184, 166, 0.5)',
      };
    }

    if (selectedSquare) {
      styles[selectedSquare] = {
        ...styles[selectedSquare],
        background: BOARD_COLORS.highlight,
      };
    }

    return styles;
  }, [highlightSquares, selectedSquare, hintSquares, hintSource, game]);

  const onSquareClick = useCallback(({ square }: { piece: { pieceType: string } | null; square: string }) => {
    if (!allowMoves || completed) return;

    const sq = square as Square;

    if (selectedSquare) {
      try {
        const move = game.move({ from: selectedSquare, to: sq, promotion: 'q' });
        if (move) {
          if (practiceTargets.length > 0 && practiceTargets.includes(sq)) {
            setFeedback({ type: 'success', message: '正確！做得好' });
            setCompleted(true);
            onCorrectMove?.();
          } else if (practiceTargets.length > 0) {
            setFeedback({ type: 'error', message: '再試一次，目標位置不對' });
            game.undo();
          }
        }
      } catch {
        // Invalid move
      }
      setSelectedSquare(null);
      return;
    }

    const piece = game.get(sq);
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(sq);
    }
  }, [allowMoves, completed, selectedSquare, game, practiceTargets, onCorrectMove]);

  const onDrop = useCallback(({ sourceSquare, targetSquare }: {
    piece: { isSparePiece: boolean; position: string; pieceType: string };
    sourceSquare: string;
    targetSquare: string | null;
  }): boolean => {
    if (!allowMoves || completed || !targetSquare) return false;

    try {
      const move = game.move({ from: sourceSquare as Square, to: targetSquare as Square, promotion: 'q' });
      if (move) {
        if (practiceTargets.length > 0 && practiceTargets.includes(targetSquare)) {
          setFeedback({ type: 'success', message: '正確！做得好' });
          setCompleted(true);
          onCorrectMove?.();
          return true;
        } else if (practiceTargets.length > 0) {
          setFeedback({ type: 'error', message: '再試一次，目標位置不對' });
          game.undo();
          return false;
        }
        return true;
      }
    } catch {
      // Invalid move
    }
    return false;
  }, [allowMoves, completed, game, practiceTargets, onCorrectMove]);

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
        <div
          ref={boardRef}
          className="relative rounded-lg overflow-hidden shadow-lg border border-border"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="application"
          aria-label="互動式棋盤"
        >
          <Chessboard
            options={{
              position: game.fen(),
              onSquareClick: onSquareClick,
              onPieceDrop: onDrop,
              squareStyles: customSquareStyles,
              boardStyle: { borderRadius: '0' },
              darkSquareStyle: { backgroundColor: BOARD_COLORS.dark },
              lightSquareStyle: { backgroundColor: BOARD_COLORS.light },
              allowDragging: allowMoves && !completed,
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between min-h-[24px]">
        {description && !feedback && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            {description}
          </p>
        )}

        {feedback && (
          <div
            className={`flex items-center gap-2 text-sm font-medium animate-fade-in ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
            role="alert"
            aria-live="polite"
          >
            {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" aria-hidden="true" /> : <XCircle className="w-4 h-4" aria-hidden="true" />}
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
}
