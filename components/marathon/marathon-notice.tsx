interface MarathonNoticeProps {
  filteredCount: number;
  activeLabels: string[];
}

export default function MarathonNotice({
  filteredCount,
  activeLabels,
}: MarathonNoticeProps) {
  return (
    <div className="marathon__notice" aria-live="polite" aria-atomic="true">
      <div className="my-4 rounded-lg border bg-slate-50/80 px-4 py-3 text-center text-sm text-muted-foreground font-anyvid">
        <p>
          현재{" "}
          <span className="text-red-600 font-bold">{filteredCount}</span>
          개의 대회가 있습니다.
          {activeLabels.length > 0 && (
            <span className="ml-1 text-red-500">
              ({activeLabels.join(", ")})
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
