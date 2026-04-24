import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営者について | itoito",
  description:
    "元公立中学校教師・中丸晴留哉が語る、itoito 立ち上げの想いとビジョン。教育は世界を変える力を持っている。",
};

export default function OperatorPage() {
  return (
    <div className="overflow-x-hidden">

      {/* ① ヒーロー */}
      <section
        className="py-24 sm:py-32 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" }}
      >
        <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-6">
          Founder&apos;s Story
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5 tracking-tight">
          教育は、世界を変える。
        </h1>
        <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed">
          その信念を、itoitoに込めて。
        </p>
      </section>

      {/* ② 運営者プロフィール */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-amber-100 shadow-lg relative bg-amber-50">
              <Image
                src="/images/founder.jpg"
                alt="中丸 晴留哉"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-2">
              itoito 代表 / 元公立中学校教師
            </p>
            <h2 className="text-3xl font-extrabold text-stone-800 mb-1">
              中丸 晴留哉
            </h2>
            <p className="text-sm text-stone-400 mb-4">Nakamaru Haruruya</p>
            <p className="text-sm text-stone-500 leading-relaxed">
              東京都江東区在住。元公立中学校教師として5年間勤務後、
              教育の可能性を広げるためitoitoを創業。
              「学校の外にも、本物の学びがある」を信じて行動し続けている。
            </p>
          </div>
        </div>
      </section>

      {/* ③ ストーリー「なぜitoitoを立ち上げたか」 */}
      <Section
        label="Why itoito"
        heading="教室の中だけでは、届かない学びがある。"
      >
        <p>
          私は5年間、公立学校で教員として勤務していました。
          正規教員として現場に立つ中で、私はある「教室の限界」に直面しました。
        </p>
        <p>
          テストの点数や受験に追われ、本来面白いはずの「学ぶ」ということに
          苦しむ子どもたちの姿がたくさんありました。
          画一的なカリキュラムや評価軸の中、学校に馴染むことができず
          自信を失っていく子どもたち。
        </p>
        <p>
          子どもたちが本質的な学びを体験し、学ぶ楽しさを知ることで、
          生涯学び続けるきっかけを作りたい。
          それが、itoitoを立ち上げた最大の動機です。
        </p>
      </Section>

      {/* ④ itoitoが目指すもの */}
      <Section
        label="Our Mission"
        heading="学校と対立するのではなく、補い合うパートナーとして。"
        bg="bg-[#fdfaf6]"
      >
        <p>
          私は学校教育を否定はしません。
          社会構造上、義務教育の役割も理解しています。
        </p>
        <p>
          だからこそ、学校と対立するのではなく、
          互いを補完し合うパートナーとして、
          既存の枠組みに合わない子でもイキイキと熱中できる
          別の学び場の創出を目指します。
        </p>
        <p>
          元教員としての経験を活かし、
          子どもたちが自分らしい人生を選択できるようになる、
          新しい教育インフラを構築します。
        </p>
      </Section>

      {/* ⑤ 変わらない想い */}
      <Section
        label="Our Belief"
        heading="10年経っても、変わらない信念。"
      >
        <p>
          22歳で教員採用試験を受けた際、
          小論文に「教育は世界を変える」と書いたことを今でも覚えています。
          あれから10年が経った今も、その想いは変わっていません。
        </p>
        <p>
          私は、学校が好きです。
          しかし現場を見続ける中で、
          教育について本気で考えれば考えるほど、
          学校は決して「完璧な場所」ではないという現実も痛感しました。
        </p>
        <p>
          だからこそ私は、学校を否定するのではなく、
          学校では補いきれない部分を支える存在でありたいと考えました。
          子どもが自分の可能性を信じられる時間、
          自分の問いを大切にできる場をつくる。
          それがitoitoの原点です。
        </p>
      </Section>

      {/* ⑥ 仲間と共に */}
      <Section
        label="With Everyone"
        heading="一人ひとりと、誠実に。"
        bg="bg-[#fdfaf6]"
      >
        <p>
          事業を続けていくうえで最も大切なのは「仲間」だと考えています。
        </p>
        <p>
          子どもたち、保護者の皆様、地域の方々、学校関係者、
          そしてホストとして体験を届けてくださる方々。
          関わってくださるすべての方が仲間です。
        </p>
        <p>
          仲間を増やすためには、信用を積み重ねるしかありません。
          目の前の一人と誠実に向き合い、小さな成果を積み上げ続ける。
          その積み重ねの先に、教育を通して社会をよりよく、
          より面白くしていく未来があると信じています。
        </p>
      </Section>

      {/* ⑦ 締めのセクション */}
      <section className="py-24 px-4 bg-stone-800 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl md:text-3xl font-extrabold text-white leading-relaxed mb-8">
            「教育は世界を変える力を持っている。
            <br className="hidden sm:block" />
            その信念を胸に、この挑戦と向き合っていきます。」
          </p>
          <p className="text-amber-400 text-base font-medium tracking-widest">
            — 中丸 晴留哉
          </p>
        </div>
      </section>

      {/* ⑧ CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-stone-400 text-sm mb-8">
            itoitoの体験に参加する、またはホストとして仲間になる。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#experiences"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-md"
            >
              itoitoの体験を見る
            </Link>
            <Link
              href="/for-host"
              className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold px-8 py-3.5 rounded-full transition-colors"
            >
              ホストとして参加する
            </Link>
          </div>
        </div>
      </section>

      {/* ⑨ 法的情報 */}
      <section className="py-8 px-4 bg-stone-50 border-t border-stone-100">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs text-stone-400 mb-2">法的情報 · 運営者情報</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <Link href="/about" className="text-stone-400 hover:text-amber-700 underline underline-offset-2">
              運営者情報
            </Link>
            <Link href="/tokushoho" className="text-stone-400 hover:text-amber-700 underline underline-offset-2">
              特定商取引法に基づく表記 →
            </Link>
            <Link href="/privacy" className="text-stone-400 hover:text-amber-700 underline underline-offset-2">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── セクションコンポーネント ── */
function Section({
  label,
  heading,
  children,
  bg = "bg-white",
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <section className={`py-20 px-4 ${bg}`}>
      <div className="max-w-[680px] mx-auto">
        {/* オレンジアクセントライン + ラベル */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 rounded-full bg-amber-500 shrink-0" />
          <p className="text-xs font-semibold text-amber-500 tracking-widest uppercase">
            {label}
          </p>
        </div>
        {/* 見出し */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800 leading-snug mb-8">
          {heading}
        </h2>
        {/* 本文 */}
        <div className="text-stone-600 leading-[1.9] space-y-5 text-[17px]">
          {children}
        </div>
      </div>
    </section>
  );
}
