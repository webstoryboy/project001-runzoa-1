import { AlertTriangle } from "lucide-react";
import { precautions } from "@/lib/data";

export default function DetailNotice() {
  return (
    <div className="detail__box">
      <div className="detail__title">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
        <h3 className="font-paperlogy font-semibold text-lg">주의사항</h3>
      </div>
      <div className="p-4 md:p-6">
        <ul className="space-y-2 font-anyvid text-sm text-muted-foreground">
          {precautions.map((text, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-amber-400" aria-hidden="true">•</span>
              <span className="break-keep leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
