# FitLog V2 - LINE LIFF設定ガイド

## 1. LINEログインチャネルの作成

### 1.1 チャネルの作成

1. [LINE Developers Console](https://developers.line.biz/console/)にアクセス
2. **「新規チャネル作成」**をクリック
3. **「LINEログイン」**を選択
4. チャネル名：「FitLog V2」
5. チャネル説明：「シンプル筋トレログアプリ」
6. 大カテゴリ：「エンターテイメント」
7. 小カテゴリ：「その他」
8. メールアドレスを入力
9. **「作成」**をクリック

### 1.2 チャネル設定

1. 作成したチャネルの詳細ページに移動
2. **「チャネル基本設定」**で以下を確認：
   - チャネル名
   - チャネル説明
   - アイコン（必要に応じて設定）

## 2. LIFFアプリの設定

### 2.1 LIFFアプリの追加

1. **「LIFF」**タブをクリック
2. **「LIFFアプリを追加」**をクリック
3. 以下の設定を行う：
   - **LIFFアプリ名**：「FitLog V2」
   - **サイズ**：「Full」
   - **Endpoint URL**：開発時は `http://localhost:3000`、本番時は `https://your-domain.com`
   - **Scope**：「profile」「openid」
   - **Bot link**：「On」
4. **「追加」**をクリック

### 2.2 LIFF IDの取得

1. 作成したLIFFアプリの詳細ページに移動
2. **「LIFF ID」**をコピー
3. このIDを環境変数 `NEXT_PUBLIC_LINE_LIFF_ID` に設定

## 3. 環境変数の設定

`.env.local`ファイルに以下を追加：

```env
NEXT_PUBLIC_LINE_LIFF_ID=your_new_liff_id_here
```

## 4. 開発時の設定

### 4.1 HTTPでの開発（推奨）

LINE LIFFは通常HTTPSを要求しますが、開発時はHTTPでも動作する場合があります：

1. 開発サーバーを起動：
   ```bash
   npm run dev
   ```

2. LINE LIFFの設定でEndpoint URLを `http://localhost:3000` に設定

3. ブラウザで `http://localhost:3000` にアクセス

4. エラーが出た場合は、ブラウザの開発者ツールで以下を実行：
   ```javascript
   // 開発時のみHTTPSチェックを無効化
   if (window.location.hostname === 'localhost') {
     // HTTPSチェックをスキップ
   }
   ```

### 4.2 HTTPSでの開発（本格的な開発）

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

### 4.3 開発時の注意点

- **HTTPでの開発**：簡単ですが、一部機能が制限される可能性があります
- **HTTPSでの開発**：完全な機能をテストできますが、設定が複雑です
- **本番環境**：必ずHTTPSを使用してください

## 5. 本番デプロイ

### 5.1 Vercelでのデプロイ

1. [Vercel](https://vercel.com)で新しいプロジェクトを作成
2. GitHubリポジトリと連携
3. 環境変数を設定：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_LINE_LIFF_ID`
4. デプロイ

### 5.2 LINE LIFF設定の更新

1. LINE Developers ConsoleでLIFFアプリの設定を開く
2. Endpoint URLを本番URLに変更（例：`https://fitlog-v2.vercel.app`）
3. 「更新」をクリック

### 5.3 LINEアプリでの公開

1. LINE Developers Consoleで「チャネル基本設定」を開く
2. 「QRコード」をダウンロード
3. このQRコードをLINEアプリでスキャンしてアプリを追加

## 6. 既存アプリとの違い

### 6.1 主な改善点

- CDNを使用したLIFF読み込み
- より安定した認証システム
- 改善されたエラーハンドリング
- 型安全性の向上

### 6.2 設定の違い

- 新しいLIFF IDを使用
- LINEログインチャネルで管理
- 独立したアプリとして動作

## 7. トラブルシューティング

### 7.1 よくあるエラー

**エラー：「LIFF initialization failed」**
- 新しいLIFF IDが正しく設定されているか確認
- 環境変数が正しく読み込まれているか確認

**エラー：「Cannot find module 'liff'」**
- CDNを使用しているため、このエラーは発生しません
- ネットワーク接続を確認

**エラー：「HTTPS required」**
- 開発時はHTTPSでアクセスするか、LINE LIFFの設定でHTTPを許可
- または、開発時のみHTTPSチェックを無効化

### 7.2 デバッグ

1. ブラウザの開発者ツールを開く
2. Consoleタブでエラーメッセージを確認
3. NetworkタブでAPIリクエストを確認

### 7.3 ログの確認

```javascript
// デバッグ用のログを追加
console.log('LIFF ID:', process.env.NEXT_PUBLIC_LINE_LIFF_ID);
console.log('User:', user);
console.log('Is in client:', liff.isInClient());
console.log('Is logged in:', liff.isLoggedIn());
```

## 8. セキュリティ

### 8.1 環境変数の管理

- 本番環境では環境変数を適切に管理
- `.env.local`ファイルをGitにコミットしない
- Vercelなどのプラットフォームで環境変数を設定

### 8.2 ユーザー認証

- LINE認証を使用してユーザーを識別
- データベースでユーザーIDを適切に管理
- 他のユーザーのデータにアクセスできないよう制御

## 9. パフォーマンス

### 9.1 最適化

- 画像の最適化
- コードの分割
- キャッシュの活用

### 9.2 モニタリング

- Vercel Analyticsの活用
- エラーログの監視
- パフォーマンスメトリクスの確認

## 10. 将来の移行について

### 10.1 LINEミニアプリへの移行

LINEはLIFFをLINEミニアプリに統合する予定です。将来的には：

1. **LINEミニアプリチャネル**での作成が推奨されます
2. **既存のLIFFアプリ**は引き続き利用可能です
3. **新機能**はLINEミニアプリで提供される予定です

### 10.2 移行のタイミング

- 現在：LIFFアプリとして開発・運用
- 将来：LINEミニアプリへの移行を検討
- 移行時：既存のLIFFアプリからLINEミニアプリへの変換ツールが提供される可能性があります 