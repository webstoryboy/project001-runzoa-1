export default function MarathonNotice() {
  return (
    <div className="marathon__notice" aria-live="polite" aria-atomic="true">
      <div className="my-4 rounded-lg border bg-slate-50/80 px-4 py-3 text-center text-sm text-muted-foreground font-anyvid">
        <p>
          현재 <span className="text-red-600 font-bold">5</span>
          개의 대회가 있습니다.
        </p>
      </div>
    </div>
  );
}
