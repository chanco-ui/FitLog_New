import { Exercise } from '@/types';

export interface ExerciseCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  exercises: Exercise[];
}

export const EXERCISE_CATEGORIES: ExerciseCategory[] = [
  {
    id: 'chest',
    name: '胸（大胸筋）',
    icon: 'Heart',
    description: '胸の筋肉を鍛える種目',
    exercises: [
      {
        id: 1,
        name: 'ベンチプレス',
        icon: 'Dumbbell',
        muscle: '胸',
        description: '胸の筋肉を鍛える基本的な種目'
      },
      {
        id: 2,
        name: 'インクラインベンチプレス',
        icon: 'Dumbbell',
        muscle: '胸',
        description: '胸の上部を集中的に鍛える種目'
      },
      {
        id: 3,
        name: 'デクラインベンチプレス',
        icon: 'Dumbbell',
        muscle: '胸',
        description: '胸の下部を集中的に鍛える種目'
      },
      {
        id: 4,
        name: 'ダンベルプレス',
        icon: 'Dumbbell',
        muscle: '胸',
        description: 'ダンベルを使用した胸の種目'
      },
      {
        id: 5,
        name: 'ダンベルフライ',
        icon: 'Dumbbell',
        muscle: '胸',
        description: '胸の内側を集中的に鍛える種目'
      },
      {
        id: 6,
        name: 'プッシュアップ（腕立て伏せ）',
        icon: 'Activity',
        muscle: '胸',
        description: '自重で胸を鍛える種目'
      },
      {
        id: 7,
        name: 'ディップス',
        icon: 'Activity',
        muscle: '胸',
        description: '胸の下部と三頭筋を鍛える種目'
      },
      {
        id: 8,
        name: 'ペクトラルフライ',
        icon: 'Target',
        muscle: '胸',
        description: 'マシンで胸を鍛える種目'
      },
      {
        id: 9,
        name: 'チェストプレス',
        icon: 'Target',
        muscle: '胸',
        description: 'マシンで胸を鍛える種目'
      }
    ]
  },
  {
    id: 'back',
    name: '背中（広背筋・僧帽筋・菱形筋）',
    icon: 'Zap',
    description: '背中の筋肉を鍛える種目',
    exercises: [
      {
        id: 10,
        name: 'デッドリフト',
        icon: 'Zap',
        muscle: '背中',
        description: '全身の筋力を鍛える複合種目'
      },
      {
        id: 11,
        name: 'ラットプルダウン',
        icon: 'ArrowUp',
        muscle: '背中',
        description: '背中の幅を広げる種目'
      },
      {
        id: 12,
        name: 'チンニング（懸垂）',
        icon: 'ArrowUp',
        muscle: '背中',
        description: '自重で背中を鍛える種目'
      },
      {
        id: 13,
        name: 'ベントオーバーロウ',
        icon: 'Zap',
        muscle: '背中',
        description: '背中の厚みを作る種目'
      },
      {
        id: 14,
        name: 'シーテッドロウ',
        icon: 'Zap',
        muscle: '背中',
        description: '座った姿勢で背中を鍛える種目'
      },
      {
        id: 15,
        name: 'ワンハンドロウ',
        icon: 'Zap',
        muscle: '背中',
        description: '片手で背中を鍛える種目'
      },
      {
        id: 16,
        name: 'プルオーバー',
        icon: 'Zap',
        muscle: '背中',
        description: '胸と背中を同時に鍛える種目'
      },
      {
        id: 17,
        name: 'バックエクステンション',
        icon: 'Zap',
        muscle: '背中',
        description: '背中の伸展を鍛える種目'
      }
    ]
  },
  {
    id: 'shoulders',
    name: '肩（三角筋）',
    icon: 'Target',
    description: '肩の筋肉を鍛える種目',
    exercises: [
      {
        id: 18,
        name: 'ショルダープレス',
        icon: 'Target',
        muscle: '肩',
        description: '肩の筋肉を鍛える種目'
      },
      {
        id: 19,
        name: 'ラテラルレイズ',
        icon: 'Target',
        muscle: '肩',
        description: '肩の側面を鍛える種目'
      },
      {
        id: 20,
        name: 'フロントレイズ',
        icon: 'Target',
        muscle: '肩',
        description: '肩の前部を鍛える種目'
      },
      {
        id: 21,
        name: 'リアレイズ',
        icon: 'Target',
        muscle: '肩',
        description: '肩の後ろを鍛える種目'
      },
      {
        id: 22,
        name: 'アップライトロウ',
        icon: 'Target',
        muscle: '肩',
        description: '肩の上部を鍛える種目'
      },
      {
        id: 23,
        name: 'シュラッグ',
        icon: 'Target',
        muscle: '肩',
        description: '僧帽筋を鍛える種目'
      },
      {
        id: 24,
        name: 'フェイスプル',
        icon: 'Target',
        muscle: '肩',
        description: '肩の後ろと僧帽筋を鍛える種目'
      },
      {
        id: 25,
        name: 'アーノルドプレス',
        icon: 'Target',
        muscle: '肩',
        description: '回転を加えた肩の種目'
      }
    ]
  },
  {
    id: 'arms',
    name: '腕（上腕二頭筋・上腕三頭筋）',
    icon: 'Zap',
    description: '腕の筋肉を鍛える種目',
    exercises: [
      {
        id: 26,
        name: 'バーベルカール',
        icon: 'Zap',
        muscle: '腕',
        description: '上腕二頭筋を鍛える種目'
      },
      {
        id: 27,
        name: 'ダンベルカール',
        icon: 'Zap',
        muscle: '腕',
        description: 'ダンベルで上腕二頭筋を鍛える種目'
      },
      {
        id: 28,
        name: 'ハンマーカール',
        icon: 'Zap',
        muscle: '腕',
        description: '前腕も同時に鍛える種目'
      },
      {
        id: 29,
        name: 'トライセップエクステンション',
        icon: 'Zap',
        muscle: '腕',
        description: '上腕三頭筋を鍛える種目'
      },
      {
        id: 30,
        name: 'ディップス',
        icon: 'Activity',
        muscle: '腕',
        description: '自重で上腕三頭筋を鍛える種目'
      },
      {
        id: 31,
        name: 'クローズグリップベンチプレス',
        icon: 'Dumbbell',
        muscle: '腕',
        description: '上腕三頭筋を集中的に鍛える種目'
      },
      {
        id: 32,
        name: 'フレンチプレス',
        icon: 'Zap',
        muscle: '腕',
        description: '上腕三頭筋を鍛える種目'
      },
      {
        id: 33,
        name: 'ケーブルカール',
        icon: 'Zap',
        muscle: '腕',
        description: 'ケーブルで上腕二頭筋を鍛える種目'
      }
    ]
  },
  {
    id: 'legs',
    name: '脚（大腿四頭筋・ハムストリングス・大臀筋）',
    icon: 'Activity',
    description: '脚の筋肉を鍛える種目',
    exercises: [
      {
        id: 34,
        name: 'スクワット',
        icon: 'Activity',
        muscle: '脚',
        description: '下半身全体を鍛える王道種目'
      },
      {
        id: 35,
        name: 'フロントスクワット',
        icon: 'Activity',
        muscle: '脚',
        description: '大腿四頭筋を集中的に鍛える種目'
      },
      {
        id: 36,
        name: 'レッグプレス',
        icon: 'Activity',
        muscle: '脚',
        description: 'マシンで脚を鍛える種目'
      },
      {
        id: 37,
        name: 'レッグエクステンション',
        icon: 'Activity',
        muscle: '脚',
        description: '太もも前を鍛える種目'
      },
      {
        id: 38,
        name: 'レッグカール',
        icon: 'Activity',
        muscle: '脚',
        description: '太もも裏を鍛える種目'
      },
      {
        id: 39,
        name: 'ランジ',
        icon: 'Activity',
        muscle: '脚',
        description: '片脚で脚を鍛える種目'
      },
      {
        id: 40,
        name: 'ブルガリアンスクワット',
        icon: 'Activity',
        muscle: '脚',
        description: '片脚でスクワットを行う種目'
      },
      {
        id: 41,
        name: 'カーフレイズ',
        icon: 'Activity',
        muscle: '脚',
        description: 'ふくらはぎを鍛える種目'
      },
      {
        id: 42,
        name: 'ヒップスラスト',
        icon: 'Activity',
        muscle: '脚',
        description: '大臀筋を集中的に鍛える種目'
      }
    ]
  },
  {
    id: 'core',
    name: '腹筋・体幹',
    icon: 'Minus',
    description: '腹筋と体幹を鍛える種目',
    exercises: [
      {
        id: 43,
        name: 'クランチ',
        icon: 'Minus',
        muscle: '体幹',
        description: '腹直筋を鍛える種目'
      },
      {
        id: 44,
        name: 'プランク',
        icon: 'Minus',
        muscle: '体幹',
        description: '体幹を鍛える静的種目'
      },
      {
        id: 45,
        name: 'レッグレイズ',
        icon: 'Minus',
        muscle: '体幹',
        description: '腹直筋下部を鍛える種目'
      },
      {
        id: 46,
        name: 'シットアップ',
        icon: 'Minus',
        muscle: '体幹',
        description: '腹直筋を鍛える種目'
      },
      {
        id: 47,
        name: 'ロシアンツイスト',
        icon: 'Minus',
        muscle: '体幹',
        description: '腹斜筋を鍛える種目'
      },
      {
        id: 48,
        name: 'マウンテンクライマー',
        icon: 'Minus',
        muscle: '体幹',
        description: '有酸素運動も含む腹筋種目'
      },
      {
        id: 49,
        name: 'バイシクルクランチ',
        icon: 'Minus',
        muscle: '体幹',
        description: '腹直筋と腹斜筋を同時に鍛える種目'
      },
      {
        id: 50,
        name: 'デッドバグ',
        icon: 'Minus',
        muscle: '体幹',
        description: '体幹の安定性を鍛える種目'
      }
    ]
  },
  {
    id: 'bodyweight',
    name: '自重トレーニング（器具なし）',
    icon: 'Activity',
    description: '器具を使わずにできる種目',
    exercises: [
      {
        id: 51,
        name: 'プッシュアップ（腕立て伏せ）',
        icon: 'Activity',
        muscle: '胸',
        description: '自重で胸を鍛える種目'
      },
      {
        id: 52,
        name: 'スクワット',
        icon: 'Activity',
        muscle: '脚',
        description: '自重で脚を鍛える種目'
      },
      {
        id: 53,
        name: 'プランク',
        icon: 'Minus',
        muscle: '体幹',
        description: '体幹を鍛える静的種目'
      },
      {
        id: 54,
        name: 'クランチ',
        icon: 'Minus',
        muscle: '体幹',
        description: '腹直筋を鍛える種目'
      },
      {
        id: 55,
        name: 'ランジ',
        icon: 'Activity',
        muscle: '脚',
        description: '自重で脚を鍛える種目'
      },
      {
        id: 56,
        name: 'マウンテンクライマー',
        icon: 'Minus',
        muscle: '体幹',
        description: '有酸素運動も含む腹筋種目'
      },
      {
        id: 57,
        name: 'バーピー',
        icon: 'Activity',
        muscle: '全身',
        description: '全身を使った有酸素運動'
      },
      {
        id: 58,
        name: 'ピストルスクワット',
        icon: 'Activity',
        muscle: '脚',
        description: '片脚で行う自重スクワット'
      },
      {
        id: 59,
        name: 'パイクプッシュアップ',
        icon: 'Activity',
        muscle: '肩',
        description: '肩を集中的に鍛えるプッシュアップ'
      },
      {
        id: 60,
        name: 'ジャンピングジャック',
        icon: 'Activity',
        muscle: '全身',
        description: '全身を使った有酸素運動'
      }
    ]
  },
  {
    id: 'cardio',
    name: '有酸素運動',
    icon: 'Zap',
    description: '心肺機能を向上させる種目',
    exercises: [
      {
        id: 61,
        name: 'ランニング',
        icon: 'Activity',
        muscle: '全身',
        description: '心肺機能を向上させる有酸素運動'
      },
      {
        id: 62,
        name: 'ウォーキング',
        icon: 'Activity',
        muscle: '全身',
        description: '低強度の有酸素運動'
      },
      {
        id: 63,
        name: 'サイクリング',
        icon: 'Activity',
        muscle: '脚',
        description: '脚を中心とした有酸素運動'
      },
      {
        id: 64,
        name: 'エリプティカル',
        icon: 'Activity',
        muscle: '全身',
        description: 'マシンを使った有酸素運動'
      },
      {
        id: 65,
        name: 'ローイング',
        icon: 'Activity',
        muscle: '全身',
        description: '全身を使った有酸素運動'
      },
      {
        id: 66,
        name: 'ステップアップ',
        icon: 'Activity',
        muscle: '脚',
        description: '脚を中心とした有酸素運動'
      },
      {
        id: 67,
        name: 'HIIT（高強度インターバルトレーニング）',
        icon: 'Zap',
        muscle: '全身',
        description: '高強度と低強度を交互に行うトレーニング'
      },
      {
        id: 68,
        name: 'タバタ',
        icon: 'Zap',
        muscle: '全身',
        description: '20秒運動・10秒休憩を8セット行うトレーニング'
      },
      {
        id: 69,
        name: 'エアロバイク',
        icon: 'Activity',
        muscle: '脚',
        description: '自転車型マシンを使った有酸素運動'
      },
      {
        id: 70,
        name: 'クロストレーナー',
        icon: 'Activity',
        muscle: '全身',
        description: '全身を使った有酸素運動'
      }
    ]
  }
];

// 後方互換性のため、既存のEXERCISESも保持
export const EXERCISES: Exercise[] = EXERCISE_CATEGORIES.flatMap(category => category.exercises); 