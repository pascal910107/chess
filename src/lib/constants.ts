// 棋子名稱對照
export const PIECE_NAMES: Record<string, { zh: string; en: string; symbol: string }> = {
  k: { zh: '國王', en: 'King', symbol: '♔' },
  q: { zh: '皇后', en: 'Queen', symbol: '♕' },
  r: { zh: '城堡', en: 'Rook', symbol: '♖' },
  b: { zh: '主教', en: 'Bishop', symbol: '♗' },
  n: { zh: '騎士', en: 'Knight', symbol: '♘' },
  p: { zh: '兵', en: 'Pawn', symbol: '♙' },
};

// 教學頁面的棋子 slug 對照
export const PIECE_SLUGS: Record<string, string> = {
  king: 'k',
  queen: 'q',
  rook: 'r',
  bishop: 'b',
  knight: 'n',
  pawn: 'p',
};

// 棋盤顏色 - Classic Light Wood Theme
export const BOARD_COLORS = {
  light: '#f0d9b5', // Classic Light Wood (Maple)
  dark: '#b58863',  // Classic Dark Wood (Oak)
  highlight: 'rgba(20, 184, 166, 0.5)', // Teal - 明顯的青綠色
  lastMove: 'rgba(253, 224, 71, 0.5)', // Yellow - 上一步黃色標記
  legalMove: 'radial-gradient(circle, rgba(20, 184, 166, 0.6) 25%, transparent 25%)', // Teal dots
  legalCapture: 'radial-gradient(circle, transparent 0%, transparent 60%, rgba(239, 68, 68, 0.7) 61%)', // Red ring
};

// 導航連結
export const NAV_LINKS = [
  { href: '/', label: '首頁' },
  { href: '/play', label: '對弈' },
  { href: '/learn', label: '教學' },
];
