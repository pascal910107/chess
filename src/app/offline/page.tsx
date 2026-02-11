"use client";

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bg-secondary)]">
      <div className="text-center px-6 py-12">
        <div className="text-6xl mb-6">&#9823;</div>
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
          目前離線
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-6">
          請檢查網路連線後再試一次
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          重新載入
        </button>
      </div>
    </main>
  );
}
