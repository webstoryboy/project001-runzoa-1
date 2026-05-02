import { APP_ENG_NAME, APP_SHORT_DESCRIPTION, APP_SLOGAN } from "@/lib/constants";

export default function MarathonTitle() {
  return (
    <div className="marathon__title">
      <div className="text-center border-t border-gray-300/40 py-8">
        <span
          aria-hidden="true"
          className="text-sm uppercase tracking-[0.35em] text-red-600 font-paperlogy font-black"
        >
          {APP_ENG_NAME}
        </span>
        <h1 className="py-1 md:py-2 text-2xl md:text-3xl text-slate-900 font-anyvid">
          {APP_SLOGAN}
        </h1>
        <p className="text-sm text-muted-foreground font-anyvid">
          {APP_SHORT_DESCRIPTION}
        </p>
      </div>
    </div>
  );
}
