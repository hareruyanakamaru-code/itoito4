import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | itoito",
};

const rows: { label: string; value: React.ReactNode }[] = [
  {
    label: "販売業者",
    value: "中丸晴留哉",
  },
  {
    label: "運営統括責任者",
    value: "中丸晴留哉",
  },
  {
    label: "所在地",
    value: (
      <>
        東京都江東区
        <br />
        <span className="text-stone-400 text-xs">
          ※ 個人情報保護の観点から詳細住所は非公開としております。
          消費者からのご請求があった場合は遅滞なく開示いたします。
        </span>
      </>
    ),
  },
  {
    label: "電話番号",
    value: (
      <>
        <span className="text-stone-400 text-xs">
          消費者からのご請求があった場合は遅滞なく開示いたします。
          お急ぎの場合はメールまたはお問い合わせフォームをご利用ください。
        </span>
      </>
    ),
  },
  {
    label: "メールアドレス",
    value: (
      <a
        href="mailto:hareruyanakamaru@gmail.com"
        className="text-amber-700 hover:underline"
      >
        hareruyanakamaru@gmail.com
      </a>
    ),
  },
  {
    label: "お問い合わせ",
    value: (
      <Link href="/contact" className="text-amber-700 hover:underline">
        お問い合わせフォームはこちら
      </Link>
    ),
  },
  {
    label: "販売価格",
    value:
      "各体験ページに記載された金額（税込）。体験によって異なります。詳細は各体験ページをご確認ください。",
  },
  {
    label: "商品代金以外に\n必要な料金",
    value:
      "体験会場への交通費・現地での材料費など、体験ページに別途記載がある場合はその金額が必要となります。決済手数料はitoitoが負担します。",
  },
  {
    label: "支払方法",
    value: "クレジットカード（Visa・Mastercard・JCB・American Express）※ Stripe による安全な決済",
  },
  {
    label: "支払時期",
    value: "申し込み完了時（クレジットカードによる即時決済）",
  },
  {
    label: "サービス提供時期",
    value: "各体験ページに記載された開催日・時間",
  },
  {
    label: "キャンセル・\n返金について",
    value: (
      <ul className="flex flex-col gap-1.5">
        {[
          "開催日の3日前（72時間前）まで：全額返金",
          "開催日の3日前〜前日まで：返金不可（ホストへの補償のため）",
          "当日キャンセル：返金不可",
          "ホスト側の理由による中止の場合：全額返金いたします",
          "天候・天災等の不可抗力による中止の場合：別途ホストとご相談いただきます",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-amber-500 shrink-0 mt-0.5">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: "動作環境",
    value:
      "インターネット接続環境、スマートフォンまたはPC（最新の主要ブラウザ推奨：Chrome・Safari・Firefox・Edge）",
  },
];

export default function TokushohoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-amber-700 transition-colors"
        >
          ← トップに戻る
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-stone-800 mb-2">
        特定商取引法に基づく表記
      </h1>
      <p className="text-sm text-stone-400 mb-10">最終更新日：2026年4月</p>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex flex-col sm:flex-row gap-2 sm:gap-6 px-6 py-5 ${
              i !== rows.length - 1 ? "border-b border-stone-100" : ""
            }`}
          >
            <span className="text-xs font-semibold text-stone-400 sm:w-40 shrink-0 pt-0.5 whitespace-pre-line">
              {label}
            </span>
            <span className="text-sm text-stone-700 leading-relaxed flex-1">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 rounded-2xl p-5 border border-amber-100 text-sm text-stone-600 leading-relaxed">
        <p className="font-semibold text-stone-800 mb-2">
          ⚠️ ご利用前にご確認ください
        </p>
        <p>
          itoitoは、体験を提供するホストとゲストをつなぐCtoCマッチングプラットフォームです。
          各体験の実施はホストが行うため、体験内容の詳細・安全管理等についてはホストとご確認ください。
          ご不明な点はお申し込み前に{" "}
          <Link href="/contact" className="text-amber-700 hover:underline">
            お問い合わせフォーム
          </Link>{" "}
          よりお気軽にご相談ください。
        </p>
      </div>
    </div>
  );
}
