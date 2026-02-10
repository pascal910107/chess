'use client';

import { RotateCcw, RefreshCw, Rotate3D } from 'lucide-react';

interface GameControlsProps {
  onUndo: () => void;
  onReset: () => void;
  onFlipBoard: () => void;
  canUndo: boolean;
}

export default function GameControls({
  onUndo,
  onReset,
  onFlipBoard,
  canUndo,
}: GameControlsProps) {
  return (
    <div className="flex gap-2 w-full">
      <ControlButton
        onClick={onUndo}
        disabled={!canUndo}
        icon={<RotateCcw className="w-4 h-4" />}
        label="悔棋"
      />
      <ControlButton
        onClick={onReset}
        icon={<RefreshCw className="w-4 h-4" />}
        label="重開"
      />
      <ControlButton
        onClick={onFlipBoard}
        icon={<Rotate3D className="w-4 h-4" />}
        label="翻轉"
      />
    </div>
  );
}

function ControlButton({ onClick, disabled, icon, label }: { onClick: () => void; disabled?: boolean; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
        bg-card hover:bg-muted text-foreground border border-border
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card
        active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      title={label}
      aria-label={label}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
