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
    <div className="flex flex-col h-full bg-card rounded-lg overflow-hidden border border-border">
      <div className="flex items-center gap-2 p-3 bg-muted border-b border-border">
        <ScrollText className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-semibold text-foreground">歷史記錄</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {history.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
            等待開局…
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-muted-foreground text-xs uppercase tracking-wider sticky top-0 bg-card">
                <th className="py-2 pl-2 w-12">#</th>
                <th className="py-2">白方</th>
                <th className="py-2">黑方</th>
              </tr>
            </thead>
            <tbody>
              {formattedHistory.map(({ moveNumber, white, black }) => (
                <tr key={moveNumber} className="hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0">
                  <td className="py-2 pl-2 text-muted-foreground font-mono text-xs">{moveNumber}.</td>
                  <td className="py-1">
                    <button
                      className="px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors w-full text-left font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-card"
                      onClick={() => onMoveClick?.((moveNumber - 1) * 2)}
                    >
                      {white?.san}
                    </button>
                  </td>
                  <td className="py-1">
                    {black && (
                      <button
                        className="px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors w-full text-left font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-card"
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
