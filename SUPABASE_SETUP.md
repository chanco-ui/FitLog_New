# Supabase セットアップ手順

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にアクセス
2. アカウントを作成またはログイン
3. 「New Project」をクリック
4. プロジェクト名を「FitLog」に設定
5. データベースパスワードを設定
6. リージョンを選択（推奨：Tokyo）
7. 「Create new project」をクリック

## 2. データベーステーブルの作成

### workouts テーブル
```sql
CREATE TABLE workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  exercise_id INTEGER NOT NULL,
  exercise_name TEXT NOT NULL,
  exercise_muscle TEXT NOT NULL,
  exercise_description TEXT NOT NULL,
  sets JSONB NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### weights テーブル
```sql
CREATE TABLE weights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 3. 環境変数の設定

`.env.local` ファイルを作成し、以下を追加：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 環境変数の取得方法：
1. Supabaseプロジェクトのダッシュボードにアクセス
2. 「Settings」→「API」をクリック
3. 「Project URL」をコピーして `NEXT_PUBLIC_SUPABASE_URL` に設定
4. 「anon public」のキーをコピーして `NEXT_PUBLIC_SUPABASE_ANON_KEY` に設定

## 4. アプリケーションの起動

```bash
npm run dev
```

## 5. 動作確認

1. アプリケーションにアクセス
2. 体重記録を追加
3. ワークアウト記録を追加
4. データがSupabaseに保存されていることを確認

## 注意事項

- 現在は仮のユーザーID（`temp_user_123`）を使用しています
- 本格的な認証システムを実装する際は、この部分を更新してください
- データベースのセキュリティルールは適切に設定してください 