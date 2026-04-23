import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー | itoito",
};

export default function PrivacyPage() {
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
        プライバシーポリシー
      </h1>
      <p className="text-sm text-stone-400 mb-10">最終更新日：2026年4月</p>

      <div className="flex flex-col gap-10 text-stone-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            1. 事業者情報
          </h2>
          <p>
            itoito（以下「当サービス」）は、体験を提供したいパートナーと体験したい参加者をつなぐプラットフォームです。
            個人情報の取り扱いについて、以下のとおりご説明します。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            2. 収集する個人情報
          </h2>
          <p className="mb-3">当サービスでは、以下の個人情報を収集することがあります。</p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "氏名（お名前）",
              "メールアドレス",
              "体験申し込み時にご入力いただいたメッセージ・コメント",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            3. 個人情報の利用目的
          </h2>
          <p className="mb-3">収集した個人情報は、以下の目的にのみ使用します。</p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "体験の申し込み対応・確認連絡",
              "パートナー（体験提供者）への連絡・情報共有",
              "サービス運営上の重要なお知らせ",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            4. 第三者への提供
          </h2>
          <p>
            当サービスは、以下の場合を除き、収集した個人情報を第三者に提供・開示することはありません。
          </p>
          <ul className="list-none flex flex-col gap-2 mt-3">
            {[
              "ご本人の同意がある場合",
              "法令に基づき開示が必要な場合",
              "体験の申し込み対応のためにパートナーへ必要最低限の情報を共有する場合",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            5. 個人情報の管理・保護
          </h2>
          <p>
            当サービスは、個人情報の漏えい・滅失・毀損を防止するため、適切な安全管理措置を講じます。
            個人情報へのアクセスは必要最小限の範囲に限定し、適切に管理します。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            6. 個人情報の開示・訂正・削除
          </h2>
          <p>
            ご自身の個人情報の開示・訂正・削除をご希望の場合は、下記のお問い合わせ先までご連絡ください。
            ご本人確認の上、合理的な期間内に対応いたします。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            7. お問い合わせ
          </h2>
          <p className="mb-2">
            個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
          </p>
          <div className="bg-amber-50 rounded-xl px-4 py-3 inline-block">
            <p className="text-xs text-stone-400 mb-0.5">メールアドレス</p>
            <a
              href="mailto:hareruyanakamaru@gmail.com"
              className="font-medium text-amber-700 hover:underline"
            >
              hareruyanakamaru@gmail.com
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            8. プライバシーポリシーの変更
          </h2>
          <p>
            本ポリシーの内容は、必要に応じて変更することがあります。
            変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
          </p>
        </section>

      </div>
    </div>
  );
}
