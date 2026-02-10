'use client';

import { useState, useCallback } from 'react';
import { Chess, Move } from 'chess.js';
import GameBoard from '@/components/GameBoard';
import MoveHistory from '@/components/MoveHistory';
import GameControls from '@/components/GameControls';
import { getGameStatus } from '@/lib/chess-utils';
import { Info, AlertTriangle } from 'lucide-react';

export default function PlayPage() {
  const [game, setGame] = useState(() => new Chess());
  const [history, setHistory] = useState<Move[]>([]);
  const [status, setStatus] = useState(() => getGameStatus(game));
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [, setUpdateKey] = useState(0);

  const handleMoveChange = useCallback((newHistory: Move[]) => {
    setHistory([...newHistory]);
  }, []);

  const handleStatusChange = useCallback((newStatus: ReturnType<typeof getGameStatus>) => {
    setStatus(newStatus);
  }, []);

  const handleUndo = useCallback(() => {
    game.undo();
    setHistory([...game.history({ verbose: true })]);
    setStatus(getGameStatus(game));
    setUpdateKey(k => k + 1);
  }, [game]);

  const handleReset = useCallback(() => {
    game.reset();
    setHistory([]);
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
    <div className="min-h-screen pt-20 pb-8 px-4 bg-wood-950 text-wood-100">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-wood-900 to-transparent opacity-80" />
        <div className="absolute -left-20 top-40 w-72 h-72 bg-wood-500/10 rounded-full blur-[100px]" />
        <div className="absolute -right-20 bottom-20 w-80 h-80 bg-wood-700/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">

          {/* Main Board Area */}
          <div className="flex flex-col items-center gap-6">
            {/* Status Bar */}
            <div className={`
              flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300
              ${status.status === 'checkmate' || status.message.includes('將軍')
                ? 'bg-red-500/10 border-red-500/30 text-red-200'
                : 'bg-wood-800/50 border-wood-700/50 text-wood-300'}
            `}>
              {status.status === 'checkmate' ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <Info className="w-4 h-4" />
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
          <div className="flex flex-col gap-6 h-full min-h-[500px]">
            {/* Game Info Panel */}
            <div className="flex flex-col h-[500px] gap-4">
              <div className="flex-1 bg-wood-900/50 backdrop-blur-sm border border-wood-700 rounded-xl overflow-hidden shadow-xl">
                <MoveHistory history={history} />
              </div>

              <div className="bg-wood-900/50 backdrop-blur-sm border border-wood-700 rounded-xl p-4 shadow-xl">
                <GameControls
                  onUndo={handleUndo}
                  onReset={handleReset}
                  onFlipBoard={handleFlipBoard}
                  canUndo={history.length > 0}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
