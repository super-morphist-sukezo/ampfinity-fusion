export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-black/20 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-black rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-base md:text-lg font-semibold">Finite × Infinite 生成中...</p>
    </div>
  );
}
