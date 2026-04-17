export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-10 mb-10 animate-pulse">
        <div className="max-w-md mx-auto flex flex-col items-center gap-4">
          <div className="h-4 w-40 bg-amber-200/60 rounded-full" />
          <div className="h-8 w-72 bg-amber-200/60 rounded-full" />
          <div className="h-4 w-56 bg-amber-200/40 rounded-full" />
          <div className="h-10 w-36 bg-amber-300/50 rounded-full mt-2" />
        </div>
      </div>

      {/* カード skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden animate-pulse"
          >
            {/* 画像エリア */}
            <div className="h-52 bg-stone-100" />
            {/* テキストエリア */}
            <div className="p-5 flex flex-col gap-3">
              <div className="h-5 w-3/4 bg-stone-100 rounded" />
              <div className="h-4 w-1/2 bg-stone-100 rounded" />
              <div className="flex gap-2 mt-1">
                <div className="h-5 w-16 bg-amber-50 rounded-full" />
                <div className="h-5 w-16 bg-amber-50 rounded-full" />
              </div>
              <div className="h-px bg-stone-100 my-1" />
              <div className="h-3 w-2/3 bg-stone-100 rounded" />
              <div className="h-3 w-1/2 bg-stone-100 rounded" />
              <div className="h-10 w-full bg-amber-50 rounded-xl mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
