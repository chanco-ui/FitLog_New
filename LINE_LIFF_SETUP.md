# LINE LIFF設定ガイド

## 1. LINE Developers Consoleでの設定

### 1.1 チャネルの作成

1. [LINE Developers Console](https://developers.line.biz/console/)にアクセス
2. 「新規チャネル作成」をクリック
3. 「Messaging API」を選択
4. チャネル名を入力（例：「FitLog」）
5. チャネル説明を入力
6. 大カテゴリ：「エンターテイメント」
7. 小カテゴリ：「その他」
8. メールアドレスを入力
9. 「作成」をクリック

### 1.2 LIFFアプリの追加

1. 作成したチャネルの詳細ページに移動
2. 「LIFF」タブをクリック
3. 「LIFFアプリを追加」をクリック
4. 以下の設定を行う：
   - LIFFアプリ名：「FitLog」
   - サイズ：「Full」
   - Endpoint URL：開発時は `http://localhost:3001`、本番時は `https://your-domain.com`
   - Scope：「profile」「openid」
   - Bot link：「On」
5. 「追加」をクリック

### 1.3 LIFF IDの取得

1. 作成したLIFFアプリの詳細ページに移動
2. 「LIFF ID」をコピー
3. このIDを環境変数 `NEXT_PUBLIC_LINE_LIFF_ID` に設定

## 2. 環境変数の設定

`.env.local`ファイルに以下を追加：

```env
NEXT_PUBLIC_LINE_LIFF_ID=your_liff_id_here
```

## 3. 開発時の設定

### 3.1 ローカル開発

1. 開発サーバーを起動：
   ```bash
   npm run dev
   ```

2. LINE LIFFの設定でEndpoint URLを `http://localhost:3001` に設定

3. LINEアプリでテスト：
   - LINEアプリを開く
   - チャット一覧で「FitLog」を検索
   - アプリを開いてテスト

### 3.2 HTTPSでの開発

LINE LIFFはHTTPSが必要なため、ローカルでもHTTPSで開発することを推奨：

1. mkcertをインストール：
   ```bash
   # macOS
   brew install mkcert
   mkcert -install
   mkcert localhost
   ```

2. Next.jsの設定でHTTPSを有効化：
   ```bash
   npm install --save-dev @next/certs
   ```

3. package.jsonのdevスクリプトを更新：
   ```json
   {
     "scripts": {
       "dev": "next dev --experimental-https"
     }
   }
   ```

## 4. 本番デプロイ

### 4.1 Vercelでのデプロイ

1. [Vercel](https://vercel.com)でプロジェクトを作成
2. GitHubリポジトリと連携
3. 環境変数を設定：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_LINE_LIFF_ID`
4. デプロイ

### 4.2 LINE LIFF設定の更新

1. LINE Developers ConsoleでLIFFアプリの設定を開く
2. Endpoint URLを本番URLに変更（例：`https://your-app.vercel.app`）
3. 「更新」をクリック

### 4.3 LINEアプリでの公開

1. LINE Developers Consoleで「Messaging API設定」を開く
2. 「QRコード」をダウンロード
3. このQRコードをLINEアプリでスキャンしてアプリを追加

## 5. トラブルシューティング

### 5.1 よくあるエラー

**エラー：「LIFF initialization failed」**
- LIFF IDが正しく設定されているか確認
- 環境変数が正しく読み込まれているか確認

**エラー：「Module not found: Can't resolve 'liff'」**
- `npm install liff` を実行
- 型定義ファイルが正しく配置されているか確認

**エラー：「HTTPS required」**
- 開発時はHTTPSでアクセスするか、LINE LIFFの設定でHTTPを許可

### 5.2 デバッグ

1. ブラウザの開発者ツールを開く
2. Consoleタブでエラーメッセージを確認
3. NetworkタブでAPIリクエストを確認

### 5.3 ログの確認

```javascript
// デバッグ用のログを追加
console.log('LIFF ID:', process.env.NEXT_PUBLIC_LINE_LIFF_ID);
console.log('User:', user);
console.log('Is in client:', liff.isInClient());
console.log('Is logged in:', liff.isLoggedIn());
```

## 6. セキュリティ

### 6.1 環境変数の管理

- 本番環境では環境変数を適切に管理
- `.env.local`ファイルをGitにコミットしない
- Vercelなどのプラットフォームで環境変数を設定

### 6.2 ユーザー認証

- LINE認証を使用してユーザーを識別
- データベースでユーザーIDを適切に管理
- 他のユーザーのデータにアクセスできないよう制御

## 7. パフォーマンス

### 7.1 最適化

- 画像の最適化
- コードの分割
- キャッシュの活用

### 7.2 モニタリング

- Vercel Analyticsの活用
- エラーログの監視
- パフォーマンスメトリクスの確認 