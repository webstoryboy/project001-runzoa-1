import { Baby } from "lucide-react";

export default function MarathonNoData() {
  return (
    <section
      aria-label="검색 결과 없음"
      className="relative overflow-hidden rounded-lg border border-dashed border-gray-200 px-6 py-14"
    >
      <div className="relative flex flex-col items-center text-center">
        <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white ring-1 ring-brand/10">
          <div
            aria-hidden="true"
            className="absolute h-24 w-24 rounded-full border border-dashed border-brand/20"
            style={{ animation: "spin 24s linear infinite" }}
          />
          <Baby
            aria-hidden="true"
            className="mx-auto h-20 w-20 text-brand/80"
            style={{ animation: "spin 12s linear infinite" }}
          />
          <span
            aria-hidden="true"
            className="absolute top-2 left-[-20%] text-2xl animate-spin"
            style={{ animationDuration: "2s" }}
          >
            🏃🏼‍♂️
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 right-[-20%] text-2xl animate-spin"
            style={{ animationDuration: "6s" }}
          >
            🏃🏼
          </span>
          <span
            aria-hidden="true"
            className="absolute right-[-20%] bottom-0 text-3xl animate-spin"
            style={{ animationDuration: "2s" }}
          >
            🤸🏻‍♂️
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[-10%] text-xl animate-spin"
            style={{ animationDuration: "3s" }}
          >
            🤾🏽
          </span>
        </div>

        <h3 className="mb-2 font-paperlogy text-xl text-gray-800">
          🥇 대회를 찾을 수 없어요!
        </h3>
        <div className="space-y-1 text-center font-anyvid text-sm text-muted-foreground">
          <p>지금 조건에서는 보이는 대회가 없어요.</p>
          <p>지역이나 일정, 종목을 조금만 바꿔서 다시 찾아보세요.</p>
          <p>
            지난 대회를 보고 싶다면 검색 필터에서 "지난 대회 포함"을 설정하세요.
          </p>
        </div>
      </div>
    </section>
  );
}
