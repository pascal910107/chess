import { Chess, Move, Square } from 'chess.js';
import { PIECE_NAMES } from './constants';

// 將走法轉換為繁體中文描述
export function getMoveDescription(move: Move): string {
  const piece = PIECE_NAMES[move.piece];
  const pieceName = piece?.zh || move.piece;

  if (move.san === 'O-O') return '短易位';
  if (move.san === 'O-O-O') return '長易位';

  let desc = pieceName;
  desc += ` ${move.from} → ${move.to}`;

  if (move.captured) {
    const capturedPiece = PIECE_NAMES[move.captured];
    desc += ` 吃 ${capturedPiece?.zh || move.captured}`;
  }

  if (move.promotion) {
    const promotedPiece = PIECE_NAMES[move.promotion];
    desc += ` 升變為 ${promotedPiece?.zh || move.promotion}`;
  }

  return desc;
}

// 取得遊戲狀態
export function getGameStatus(game: Chess): {
  status: 'playing' | 'checkmate' | 'stalemate' | 'draw';
  message: string;
  winner?: 'white' | 'black';
} {
  if (game.isCheckmate()) {
    const winner = game.turn() === 'w' ? 'black' : 'white';
    return {
      status: 'checkmate',
      message: `將死！${winner === 'white' ? '白方' : '黑方'}獲勝`,
      winner,
    };
  }

  if (game.isStalemate()) {
    return {
      status: 'stalemate',
      message: '逼和！無子可動',
    };
  }

  if (game.isDraw()) {
    return {
      status: 'draw',
      message: '和棋',
    };
  }

  const inCheck = game.inCheck();
  const turn = game.turn() === 'w' ? '白方' : '黑方';

  return {
    status: 'playing',
    message: inCheck ? `${turn}被將軍！` : `輪到${turn}`,
  };
}

// 取得所有合法走步的目標格
export function getLegalMoves(game: Chess, square: Square): Square[] {
  const moves = game.moves({ square, verbose: true });
  return moves.map(move => move.to);
}

// 檢查是否為合法走步
export function isLegalMove(game: Chess, from: Square, to: Square): boolean {
  const moves = game.moves({ square: from, verbose: true });
  return moves.some(move => move.to === to);
}

// 格式化走棋歷史（配對顯示）
export function formatMoveHistory(history: Move[]): { moveNumber: number; white?: Move; black?: Move }[] {
  const pairs: { moveNumber: number; white?: Move; black?: Move }[] = [];

  for (let i = 0; i < history.length; i += 2) {
    pairs.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1],
    });
  }

  return pairs;
}
