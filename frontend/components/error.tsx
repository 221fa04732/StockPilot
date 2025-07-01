export default function Error() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white pt-32 pb-40">
      <div className="text-2xl font-semibold text-red-500">Something went wrong!</div>
      <div className="mt-2 text-sm text-gray-400">Please try again later.</div>
    </div>
  );
}
