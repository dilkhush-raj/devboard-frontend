export default function Loading() {
  return (
    <div className="grid min-h-40 grid-cols-3 gap-4 overflow-hidden p-4">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
        <div key={item} className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 h-40 w-full -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[#ffffff5b] to-transparent dark:via-darkColor-300"></div>
          <div
            key={item}
            className="h-40 w-full bg-zinc-200 shadow-sm dark:bg-darkColor-200"
          ></div>
        </div>
      ))}
    </div>
  );
}
