'use client';

import { useState, useCallback } from 'react';
import { Chess, Move } from 'chess.js';
import GameBoard from '@/components/GameBoard';
import MoveHistory from '@/components/MoveHistory';
import GameControls from '@/components/GameControls';
import ChessChat from '@/components/ChessChat';
import { getGameStatus } from '@/lib/chess-utils';
import { Info, AlertTriangle } from 'lucide-react';

export default function PlayPage() {
  const [game, setGame] = useState(() => new Chess());
  const [history, setHistory] = useState<Move[]>([]);
  const [status, setStatus] = useState(() => getGameStatus(game));
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [, setUpdateKey] = useState(0);
  const [moveHistorySan, setMoveHistorySan] = useState('');

  const handleMoveChange = useCallback((newHistory: Move[]) => {
    setHistory([...newHistory]);
    setMoveHistorySan(newHistory.map(m => m.san).join(' '));
  }, []);

  const handleStatusChange = useCallback((newStatus: ReturnType<typeof getGameStatus>) => {
    setStatus(newStatus);
  }, []);

  const handleUndo = useCallback(() => {
    game.undo();
    const newHistory = game.history({ verbose: true });
    setHistory([...newHistory]);
    setMoveHistorySan(newHistory.map(m => m.san).join(' '));
    setStatus(getGameStatus(game));
    setUpdateKey(k => k + 1);
  }, [game]);

  const handleReset = useCallback(() => {
    game.reset();
    setHistory([]);
    setMoveHistorySan('');
    setStatus(getGameStatus(game));
    setUpdateKey(k => k + 1);
  }, [game]);

  const handleFlipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white');
  }, []);

  const handleGameChange = useCallback((newGame: Chess) => {
    setStatus(getGameStatus(newGame));
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-background text-foreground">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-accent/5 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">

          {/* Main Board Area */}
          <div className="flex flex-col items-center gap-6">
            {/* Status Bar */}
            <div className={`
              flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300
              ${status.status === 'checkmate' || status.message.includes('將軍')
                ? 'bg-destructive/10 border-destructive/30 text-destructive'
                : 'bg-card/50 border-border/50 text-muted-foreground'}
            `}>
              {status.status === 'checkmate' ? (
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Info className="w-4 h-4" aria-hidden="true" />
              )}
              <span className="text-sm font-medium">{status.message}</span>
            </div>

            {/* Chess Board */}
            <div className="w-full max-w-[650px] flex justify-center">
              <GameBoard
                onMoveChange={handleMoveChange}
                onStatusChange={handleStatusChange}
                boardOrientation={boardOrientation}
                externalGame={game}
                onGameChange={handleGameChange}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4 h-full">
            {/* Move History */}
            <div className="h-[240px] bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-xl">
              <MoveHistory history={history} />
            </div>

            {/* Game Controls */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl">
              <GameControls
                onUndo={handleUndo}
                onReset={handleReset}
                onFlipBoard={handleFlipBoard}
                canUndo={history.length > 0}
              />
            </div>

            {/* AI Chat */}
            <div className="h-[500px] bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-xl">
              <ChessChat
                fen={game.fen()}
                moveHistory={moveHistorySan}
                turn={game.turn()}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
