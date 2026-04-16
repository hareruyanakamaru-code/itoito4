import Link from "next/link";

export const metadata = {
  title: "利用規約 | itoito",
};

export default function TermsPage() {
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

      <h1 className="text-2xl font-bold text-stone-800 mb-2">利用規約</h1>
      <p className="text-sm text-stone-400 mb-10">最終更新日：2026年4月</p>

      <div className="flex flex-col gap-10 text-stone-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            1. サービス概要
          </h2>
          <p className="mb-3">
            itoito（以下「当サービス」）は、体験を提供したいホスト（先生・職人・ファシリテーターなど）と、
            体験したいゲスト（子ども・学生・大人）をつなぐCtoCプラットフォームです。
          </p>
          <p>
            本規約は、当サービスを利用するすべてのユーザー（ホスト・ゲスト）に適用されます。
            当サービスをご利用いただくことで、本規約に同意したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            2. ユーザーの責任
          </h2>
          <ul className="list-none flex flex-col gap-2">
            {[
              "ユーザーは、正確な情報を入力するものとします。",
              "ホストは、掲載する体験の内容・日時・料金等を正確に記載する責任を負います。",
              "ゲストは、申し込んだ体験に誠実に参加するよう努めるものとします。",
              "ユーザーは、当サービスを通じて知り得た他者の個人情報を、目的外に利用してはなりません。",
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
            3. 禁止事項
          </h2>
          <p className="mb-3">以下の行為を禁止します。</p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "虚偽の情報を登録・掲載する行為",
              "他のユーザーへの迷惑行為・ハラスメント",
              "当サービスを通じた詐欺・不正行為",
              "違法または公序良俗に反する体験の掲載・申し込み",
              "当サービスの運営を妨害する行為",
              "未成年者を対象とした不適切な体験の提供",
              "スパム・不正なデータ送信",
              "その他、当サービスが不適切と判断する行為",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            4. 知的財産権
          </h2>
          <p>
            当サービス上のコンテンツ（テキスト・デザイン・ロゴ等）に関する知的財産権は、
            当サービスまたは正当な権利者に帰属します。
            ユーザーが投稿したコンテンツの著作権はユーザー本人に帰属しますが、
            当サービスの運営・改善目的での使用を許諾したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            5. 免責事項
          </h2>
          <ul className="list-none flex flex-col gap-2">
            {[
              "当サービスは、ホストとゲストの間を仲介するプラットフォームであり、体験自体の品質・安全性について直接の責任を負いません。",
              "天災・通信障害・システム障害等の不可抗力によるサービス停止・データ消失について、当サービスは責任を負いません。",
              "ユーザー間のトラブルについて、当サービスは調整に努めますが、その解決を保証するものではありません。",
              "当サービスへのリンクや外部サービスの内容について、当サービスは責任を負いません。",
              "当サービスは予告なく内容を変更・停止する場合があります。",
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
            6. 規約の変更
          </h2>
          <p>
            当サービスは、必要に応じて本規約を変更することがあります。
            変更後の規約は、本ページに掲載した時点から効力を生じます。
            重要な変更がある場合は、サービス内でお知らせします。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-stone-800 mb-3 pb-2 border-b border-stone-100">
            7. お問い合わせ
          </h2>
          <p className="mb-2">本規約に関するお問い合わせは、以下までご連絡ください。</p>
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

      </div>
    </div>
  );
}
