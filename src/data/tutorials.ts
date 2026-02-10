export interface PieceTutorial {
  slug: string;
  name: string;
  symbol: string;
  description: string;
  movement: string[];
  tips: string[];
  initialPosition: string; // FEN
  highlightSquares: string[]; // 展示可移動位置
  practicePosition?: string; // 練習用 FEN
  practiceTarget?: string[]; // 正確的移動目標
}

export const pieceTutorials: PieceTutorial[] = [
  {
    slug: 'king',
    name: '國王',
    symbol: '♔',
    description: '國王是最重要的棋子，但移動能力有限。保護好國王是致勝關鍵！',
    movement: [
      '國王可以向任何方向移動一格',
      '可以斜走、直走、橫走',
      '不能移動到被敵方棋子攻擊的格子',
      '可以吃掉一格內的敵方棋子',
    ],
    tips: [
      '開局時盡快進行王車易位保護國王',
      '中局時保持國王在安全位置',
      '殘局時國王可以積極參與進攻',
    ],
    initialPosition: '8/8/8/8/3K4/8/8/7k w - - 0 1',
    highlightSquares: ['c5', 'd5', 'e5', 'c4', 'e4', 'c3', 'd3', 'e3'],
    practicePosition: '8/8/8/4p3/3K4/8/8/7k w - - 0 1',
    practiceTarget: ['e5'],
  },
  {
    slug: 'queen',
    name: '皇后',
    symbol: '♕',
    description: '皇后是最強大的棋子，結合了城堡和主教的移動能力。',
    movement: [
      '皇后可以直線或斜線移動任意格數',
      '不能越過其他棋子',
      '結合了城堡和主教的走法',
    ],
    tips: [
      '開局時不要太早出動皇后',
      '皇后很適合發動雙重攻擊',
      '保護好皇后，她的價值約等於9個兵',
    ],
    initialPosition: '4K2k/8/8/8/3Q4/8/8/8 w - - 0 1',
    highlightSquares: [
      'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4',
      'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8',
      'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8',
      'a7', 'b6', 'c5', 'e3', 'f2', 'g1',
    ],
  },
  {
    slug: 'rook',
    name: '城堡',
    symbol: '♖',
    description: '城堡（車）是強力的長距離棋子，擅長控制直線。',
    movement: [
      '城堡可以直線移動任意格數（橫向或縱向）',
      '不能斜走',
      '不能越過其他棋子',
    ],
    tips: [
      '讓兩個城堡互相保護（連成一線）',
      '控制開放的直行',
      '城堡在殘局特別強大',
    ],
    initialPosition: '4K2k/8/8/8/3R4/8/8/8 w - - 0 1',
    highlightSquares: [
      'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4',
      'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8',
    ],
  },
  {
    slug: 'bishop',
    name: '主教',
    symbol: '♗',
    description: '主教沿斜線移動，一個主教只能在同一顏色的格子上活動。',
    movement: [
      '主教只能斜線移動任意格數',
      '不能直走或橫走',
      '不能越過其他棋子',
      '白格主教永遠在白格，黑格主教永遠在黑格',
    ],
    tips: [
      '兩個主教（雙象）配合很強大',
      '在開放局面主教比騎士強',
      '控制長斜線可以很有威力',
    ],
    initialPosition: '4K2k/8/8/8/3B4/8/8/8 w - - 0 1',
    highlightSquares: [
      'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8',
      'a7', 'b6', 'c5', 'e3', 'f2', 'g1',
    ],
  },
  {
    slug: 'knight',
    name: '騎士',
    symbol: '♘',
    description: '騎士走「日」字形，是唯一可以跳過其他棋子的棋子。',
    movement: [
      '騎士走「日」字形：先直走兩格，再橫走一格（或相反）',
      '可以跳過其他棋子',
      '每次移動都會變換所在格子的顏色',
    ],
    tips: [
      '騎士在封閉局面比主教強',
      '騎士放在中心位置最強',
      '騎士不適合守衛遠處的棋子',
    ],
    initialPosition: '4K2k/8/8/8/3N4/8/8/8 w - - 0 1',
    highlightSquares: ['b5', 'c6', 'e6', 'f5', 'f3', 'e2', 'c2', 'b3'],
  },
  {
    slug: 'pawn',
    name: '兵',
    symbol: '♙',
    description: '兵是數量最多的棋子，走法獨特且有升變的可能。',
    movement: [
      '兵只能向前走，不能後退',
      '普通移動：向前一格',
      '首次移動：可選擇向前一格或兩格',
      '吃子：斜前方一格（不能直接向前吃子）',
    ],
    tips: [
      '兵鏈結構可以互相保護',
      '中心的兵很重要',
      '到達底線可以升變成任何棋子（通常選皇后）',
    ],
    initialPosition: '4K2k/8/8/8/3P4/8/8/8 w - - 0 1',
    highlightSquares: ['d5'],
    practicePosition: '4K2k/8/8/2p1p3/3P4/8/8/8 w - - 0 1',
    practiceTarget: ['c5', 'e5'],
  },
];

export interface SpecialRule {
  slug: string;
  name: string;
  description: string;
  explanation: string[];
  demoPosition: string;
  demoMoves?: { from: string; to: string }[];
}

export const specialRules: SpecialRule[] = [
  {
    slug: 'castling',
    name: '王車易位',
    description: '一個特殊的防禦性走法，可以同時移動國王和城堡。',
    explanation: [
      '王車易位是國王和城堡的聯合移動',
      '短易位（O-O）：國王向城堡方向移動兩格，城堡跳到國王另一側',
      '長易位（O-O-O）：同上，但向皇后側的城堡移動',
      '條件：國王和該城堡都未移動過，中間無棋子，國王不能正在被將軍、經過或到達被攻擊的格子',
    ],
    demoPosition: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
  },
  {
    slug: 'en-passant',
    name: '吃過路兵',
    description: '一個特殊的兵吃子規則，只在特定情況下可以使用。',
    explanation: [
      '當敵方兵從起始位置前進兩格，剛好落在你的兵旁邊時',
      '你可以假裝敵方兵只前進一格，斜著吃掉它',
      '這個機會只在下一步有效，過期作廢',
      '這是為了防止兵用兩步前進來躲避被吃',
    ],
    demoPosition: '4K2k/8/8/3pP3/8/8/8/8 w - d6 0 1',
  },
  {
    slug: 'promotion',
    name: '兵的升變',
    description: '當兵到達棋盤底線時，必須升變成其他棋子。',
    explanation: [
      '當兵走到棋盤的最後一行（對白方是第8行，黑方是第1行）',
      '兵必須升變成皇后、城堡、主教或騎士',
      '大多數情況下會選擇升變為皇后（最強）',
      '特殊情況下可能升變為騎士以造成將軍',
    ],
    demoPosition: '4K2k/4P3/8/8/8/8/8/8 w - - 0 1',
  },
  {
    slug: 'check-checkmate',
    name: '將軍與將死',
    description: '理解將軍和將死是西洋棋的核心。',
    explanation: [
      '將軍（Check）：國王受到攻擊',
      '被將軍時必須立即解除：移動國王、用棋子擋住、吃掉攻擊者',
      '將死（Checkmate）：國王被將軍且無法解除',
      '將死時遊戲結束，攻擊方獲勝',
    ],
    demoPosition: 'k7/8/1K6/8/8/8/8/1R6 w - - 0 1',
  },
];

export const basicsContent = {
  title: '西洋棋基礎',
  sections: [
    {
      title: '棋盤',
      content: [
        '西洋棋使用 8×8 的方格棋盤',
        '棋盤共有 64 格，深淺交替',
        '擺放時確保右下角是淺色格',
        '橫行用數字 1-8 標記，直列用字母 a-h 標記',
      ],
    },
    {
      title: '棋子',
      content: [
        '每方有 16 個棋子',
        '1 個國王（♔）- 最重要的棋子',
        '1 個皇后（♕）- 最強的棋子',
        '2 個城堡（♖）- 控制直線',
        '2 個主教（♗）- 控制斜線',
        '2 個騎士（♘）- 可以跳躍',
        '8 個兵（♙）- 數量最多',
      ],
    },
    {
      title: '初始擺放',
      content: [
        '第 1 行和第 8 行放主力棋子',
        '從左到右：城堡、騎士、主教、皇后、國王、主教、騎士、城堡',
        '記憶口訣：「皇后站自己的顏色」（白皇后在白格，黑皇后在黑格）',
        '第 2 行和第 7 行放兵',
      ],
    },
    {
      title: '遊戲目標',
      content: [
        '目標是將死對方國王',
        '白方先走',
        '雙方輪流移動',
        '被將死的一方輸掉遊戲',
      ],
    },
  ],
  initialPosition: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
};
