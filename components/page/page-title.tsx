interface PageTitleProps {
  subtitle: string;
  title: string;
  description: string;
}

export default function PageTitle({
  subtitle,
  title,
  description,
}: PageTitleProps) {
  return (
    <div className="text-center py-8 md:py-10 border-t border-gray-300/20">
      <span className="text-xs font-paperlogy font-semibold uppercase tracking-[0.35em] text-red-600 pl-1.5">
        {subtitle}
      </span>
      <h1 className="font-nanumNeo py-1 md:py-2 text-2xl text-slate-900 md:text-3xl">
        {title}
      </h1>
      <p className="font-anyvid text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
