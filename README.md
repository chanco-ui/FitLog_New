# FitLog V2 - シンプル筋トレログ

LINEアプリで動作するシンプルな筋トレログアプリです。

## 機能

- 筋トレ記録
- 体重記録
- カレンダー表示
- 履歴表示
- LINE認証

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# LINE LIFF設定
NEXT_PUBLIC_LINE_LIFF_ID=your_line_liff_id
```

### 3. Supabaseの設定

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. 以下のSQLを実行してテーブルを作成：

```sql
-- ワークアウトテーブル
CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  exercise_muscle TEXT NOT NULL,
  exercise_description TEXT,
  sets JSONB NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 体重テーブル
CREATE TABLE weights (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  weight DECIMAL(4,1) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. LINE LIFFの設定

1. [LINE Developers Console](https://developers.line.biz/console/)でチャネルを作成
2. LIFFアプリを追加
3. Endpoint URLを設定（例：`https://your-domain.com`）
4. LIFF IDを環境変数に設定

### 5. 開発サーバーの起動

```bash
npm run dev
```

## デプロイ

### Vercelでのデプロイ

1. [Vercel](https://vercel.com)でプロジェクトを作成
2. 環境変数を設定
3. デプロイ

### LINE LIFFでの公開

1. LIFFアプリの設定でEndpoint URLを本番URLに変更
2. アプリをLINEアプリに追加

## 技術スタック

- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase
- LINE LIFF SDK
- date-fns
- Lucide React

## ライセンス

MIT
