export default function Component() {
  return (
    <div className="flex items-center justify-between w-full max-w-md">
      <span className="text-gray-900 font-medium">Hi there Michael,</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-700">Points available:</span>
        <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          1569 pts
        </div>
      </div>
    </div>
  );
}
