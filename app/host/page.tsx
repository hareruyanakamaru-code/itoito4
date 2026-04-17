import { submitExperience } from "@/lib/actions";
import Link from "next/link";

export default function HostPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-amber-700 mb-6 transition-colors"
      >
        ← トップに戻る
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-1">
          体験を投稿する
        </h1>
        <p className="text-sm text-stone-500">
          あなたの素敵な体験を登録して、ゲストと出会いましょう。
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8">
        <form action={submitExperience} className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-stone-700">
              体験タイトル <span className="text-red-400 text-xs">必須</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="例：親子で楽しむ手前味噌づくり体験"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="category"
              className="text-sm font-medium text-stone-700"
            >
              カテゴリ <span className="text-red-400 text-xs">必須</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition bg-white"
            >
              <option value="">選択してください</option>
              <option value="料理・ものづくり">🍳 料理・ものづくり</option>
              <option value="探究・学び">🔍 探究・学び</option>
              <option value="自然・アウトドア">🌿 自然・アウトドア</option>
              <option value="アート・表現">🎨 アート・表現</option>
              <option value="その他">✨ その他</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-sm font-medium text-stone-700"
            >
              体験の説明 <span className="text-red-400 text-xs">必須</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              placeholder="体験の内容・楽しみ方・対象者などを詳しく書いてください。"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="date"
                className="text-sm font-medium text-stone-700"
              >
                開催日 <span className="text-red-400 text-xs">必須</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="time"
                className="text-sm font-medium text-stone-700"
              >
                時間帯
              </label>
              <input
                type="text"
                id="time"
                name="time"
                placeholder="例：10:00〜13:00"
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="location"
              className="text-sm font-medium text-stone-700"
            >
              開催場所 <span className="text-red-400 text-xs">必須</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              placeholder="例：東京都世田谷区三軒茶屋"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
            />
          </div>

          {/* Capacity and Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="capacity"
                className="text-sm font-medium text-stone-700"
              >
                定員（人）
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                min={1}
                defaultValue={10}
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="price"
                className="text-sm font-medium text-stone-700"
              >
                参加費（円）
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min={0}
                defaultValue={3000}
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-stone-100 pt-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-4">
              ホスト情報
            </p>

            {/* Host name */}
            <div className="flex flex-col gap-1.5 mb-4">
              <label
                htmlFor="hostName"
                className="text-sm font-medium text-stone-700"
              >
                ホスト名 <span className="text-red-400 text-xs">必須</span>
              </label>
              <input
                type="text"
                id="hostName"
                name="hostName"
                required
                placeholder="例：田中 花子"
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
              />
            </div>

            {/* Host bio */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="hostBio"
                className="text-sm font-medium text-stone-700"
              >
                自己紹介
              </label>
              <textarea
                id="hostBio"
                name="hostBio"
                rows={3}
                placeholder="あなたの経歴や体験への想いを書いてください。"
                className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition resize-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tags"
              className="text-sm font-medium text-stone-700"
            >
              タグ{" "}
              <span className="text-stone-400 text-xs font-normal">
                カンマ区切りで入力
              </span>
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="例：親子, 発酵, 食育"
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
            />
          </div>

          {/* 写真 */}
          <div className="flex flex-col gap-3 border-t border-stone-100 pt-4">
            <div>
              <p className="text-sm font-medium text-stone-700 mb-0.5">
                体験の写真URL{" "}
                <span className="text-stone-400 text-xs font-normal">最大3枚</span>
              </p>
              <p className="text-xs text-stone-400">
                GoogleドライブやDropboxなどで共有した画像のURLを貼り付けてください。
              </p>
            </div>

            {/* 写真ヒント */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-xs text-stone-600 flex flex-col gap-2">
              <p className="font-semibold text-amber-700">📸 どんな写真が効果的？</p>
              <ul className="flex flex-col gap-1.5 list-none">
                <li className="flex gap-2"><span>📷1枚目</span><span>体験中のメインカット（子どもや参加者が笑顔で作業している様子）</span></li>
                <li className="flex gap-2"><span>📷2枚目</span><span>完成品や成果物のアップ（料理・作品・観察した生き物など）</span></li>
                <li className="flex gap-2"><span>📷3枚目</span><span>会場・空間の雰囲気（どんな場所で体験するかわかる引きの写真）</span></li>
              </ul>
              <p className="text-stone-400 mt-1">
                推奨サイズ：横1200px以上 / 横長（4:3または16:9）/ 明るく鮮明な写真
              </p>
            </div>

            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col gap-1.5">
                <label htmlFor={`image${n}`} className="text-xs font-medium text-stone-600">
                  写真{n}{n === 1 ? <span className="text-stone-400 font-normal ml-1">（メイン）</span> : <span className="text-stone-400 font-normal ml-1">（任意）</span>}
                </label>
                <input
                  type="url"
                  id={`image${n}`}
                  name={`image${n}`}
                  placeholder="https://..."
                  className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm text-base"
          >
            体験を投稿する
          </button>
        </form>
      </div>
    </div>
  );
}
