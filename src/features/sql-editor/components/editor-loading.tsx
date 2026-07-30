export function EditorLoading() {
  return (
    <div
      aria-label="Loading SQL editor"
      aria-live="polite"
      className="flex min-h-[360px] animate-pulse flex-col gap-3 bg-[#17201c] p-5 md:min-h-[520px]"
      role="status"
    >
      <span className="h-3 w-3/4 rounded-sm bg-[#344139]" />
      <span className="h-3 w-1/2 rounded-sm bg-[#344139]" />
      <span className="h-3 w-2/3 rounded-sm bg-[#344139]" />
      <span className="sr-only">Loading SQL editor</span>
    </div>
  );
}
