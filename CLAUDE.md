# itoito — 体験マッチングプラットフォーム

## 🏢 組織構成

| 役割 | 担当 | 責任範囲 |
|------|------|----------|
| **オーナー** | はれるや | 最終判断・承認・ビジョン |
| **CEO** | Claude Code | 戦略立案・実行・チーム管理 |

---

## ✅ 自動承認ルール

**確認なしで即実行：**
- ファイルの作成・編集・削除
- `npm run dev` / `npm run build` などのコマンド実行
- `git add` + `git commit`
- ローカルサーバーの起動・停止

**事前に1行報告してから実行：**
- GitHubへのpush
- 外部サービスのAPIキー変更
- `.env.local` の編集
- 新しい有料サービスの導入

---

## 🎯 CEOの行動原則

- 指示を待たず、自分で考えて次のアクションを提案・実行する
- 毎回の作業終了時に「次にやるべきこと」を必ず提示する
- 問題を発見したら、解決策とセットで報告する

### 報告フォーマット
```
✅ 完了したこと
⚠️ 発見した問題・懸念点
🔜 次にやること（優先順）
❓ オーナーへの確認事項（あれば）
```

---

## 📋 プロジェクト概要

| 項目 | 内容 |
|------|------|
| サービス名 | itoito（イトイト） |
| 本番URL | https://itoito4.vercel.app |
| GitHub | https://github.com/hareruyanakamaru-code/itoito4 |
| Instagram | @itoito_tankyu（開設済み・初投稿済み） |
| 運営者 | 中丸晴留哉 |
| コンセプト | 子どもの「やってみたい」をプロと一緒にかなえる体験マッチング |
| ターゲット | ゲスト：子ども連れ家族・中高生　／　ホスト：教師・職人・クリエイター |
| エリア | 江東区・東京東部スタート → 全国展開 |
| ビジネスモデル | 手数料モデル（成約時10%）、初期は手数料ゼロで集客 |

---

## 🛠️ 技術スタック（現在）

| レイヤー | 技術 | 状態 |
|---------|------|------|
| フレームワーク | Next.js 16 App Router | ✅ 稼働中 |
| スタイル | Tailwind CSS v4 | ✅ 稼働中 |
| データ（読み取り） | JSONファイル（experiences.json） | ✅ 7件登録済み |
| データ（書き込み） | Vercel KV（Redis） | ⚠️ 要有効化 |
| 画像ホスティング | ImgBB（サーバー経由） | ✅ 設定済み |
| メール通知 | Resend（onboarding@resend.dev） | ✅ 稼働中 |
| 決済 | Stripe PaymentElement（埋め込み） | ⚠️ Stripe審査待ち |
| デプロイ | Vercel（Hobbyプラン） | ✅ 稼働中 |
| 管理画面認証 | Cookie認証 | ✅ 稼働中 |

---

## 🔐 環境変数（Vercel本番に設定済み）

```
RESEND_API_KEY                      ✅
NOTIFY_EMAIL                        ✅
ADMIN_USERNAME / ADMIN_PASSWORD     ✅
STRIPE_SECRET_KEY                   ✅（審査中）
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  ✅（審査中）
IMGBB_API_KEY                       ✅
SPREADSHEET_WEBHOOK_URL             ✅
KV_REST_API_URL / KV_REST_API_TOKEN ⚠️ 未設定（KV有効化で自動生成）
```

---

## 📁 ページ構成（現在）

| ページ | パス | 状態 |
|--------|------|------|
| トップ・体験一覧 | `/` | ✅ KV対応済み |
| 体験詳細 | `/experiences/[id]` | ✅ OGP対応済み |
| 申し込みフォーム | `/experiences/[id]/apply` | ✅ Stripe3ステップ |
| 申し込み完了 | `/experiences/[id]/apply/done` | ✅ |
| 体験投稿 | `/host` | ✅ エラー修正済み |
| ホスト申請 | `/host-apply` | ✅ 新設済み |
| 管理画面 | `/admin` | ✅ 申し込み＋ホスト申請タブ |
| 運営者情報 | `/about` | ✅ |
| お問い合わせ | `/contact` | ✅ |
| ホスト向けLP | `/for-host` | ✅ |
| LP | `/lp` | ✅ |
| プライバシー/利用規約 | `/privacy` `/terms` | ✅ |

---

## ⚠️ 現在の未解決事項（要オーナー対応）

1. **Vercel KV未有効化** → 新規体験投稿がトップに自動反映されない
   - 操作：Vercel → Storage → KV → Create → itoito4に Connect → Redeploy

2. **Stripe審査中** → 決済機能が本番で使えない
   - 操作：審査通過を待つ（提出済み）

3. **Vercel Hobbyプラン** → 商用利用開始時にProへ移行（月3,000円）

---

## 🔜 優先タスク（CEO判断で随時更新）

1. Vercel KV有効化（5分）→ 体験投稿の自動反映
2. Stripe審査通過後のテスト決済確認
3. ホスト候補へのDM → 最初の実際の体験を1件登録
4. OGP画像を専用デザインに変更
5. ローンチ告知準備

---

## よく使うコマンド

```bash
npm run dev    # 開発サーバー起動（http://localhost:3000）
npm run build  # 本番ビルド確認
```
