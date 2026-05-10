interface DetailHeaderProps {
  name: string;
  description: string | null;
}

export default function DetailHeader({ name, description }: DetailHeaderProps) {
  return (
    <div className="detail__header">
      <h1 className="text-2xl md:text-3xl font-paperlogy font-semibold mb-2">
        {name}
      </h1>
      <p className="text-muted-foreground font-anyvid text-sm break-keep">
        {description}
      </p>
    </div>
  );
}
