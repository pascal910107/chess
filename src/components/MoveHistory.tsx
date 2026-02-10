'use client';

import { Move } from 'chess.js';
import { formatMoveHistory } from '@/lib/chess-utils';
import { ScrollText } from 'lucide-react';

interface MoveHistoryProps {
  history: Move[];
  onMoveClick?: (index: number) => void;
}

export default function MoveHistory({ history, onMoveClick }: MoveHistoryProps) {
  const formattedHistory = formatMoveHistory(history);

  return (
    <div className="flex flex-col h-full bg-wood-900 rounded-lg overflow-hidden border border-wood-700">
      <div className="flex items-center gap-2 p-3 bg-wood-800 border-b border-wood-700">
        <ScrollText className="w-4 h-4 text-wood-400" />
        <span className="text-sm font-semibold text-wood-100">歷史記錄</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-wood-700 scrollbar-track-transparent">
        {history.length === 0 ? (
          <div className="h-full flex items-center justify-center text-wood-500 text-sm italic">
            等待開局...
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-wood-400 text-xs uppercase tracking-wider sticky top-0 bg-wood-900">
                <th className="py-2 pl-2 w-12">#</th>
                <th className="py-2">白方</th>
                <th className="py-2">黑方</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              {formattedHistory.map(({ moveNumber, white, black }) => (
                <tr key={moveNumber} className="hover:bg-wood-800/50 transition-colors border-b border-wood-800/50 last:border-0">
                  <td className="py-2 pl-2 text-wood-500 font-mono text-xs">{moveNumber}.</td>
                  <td className="py-1">
                    <button
                      className="px-2 py-1 rounded hover:bg-wood-400/20 hover:text-wood-400 transition-colors w-full text-left font-medium text-wood-200"
                      onClick={() => onMoveClick?.((moveNumber - 1) * 2)}
                    >
                      {white?.san}
                    </button>
                  </td>
                  <td className="py-1">
                    {black && (
                      <button
                        className="px-2 py-1 rounded hover:bg-wood-400/20 hover:text-wood-400 transition-colors w-full text-left font-medium text-wood-200"
                        onClick={() => onMoveClick?.((moveNumber - 1) * 2 + 1)}
                      >
                        {black.san}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
