import { Baby } from "lucide-react";

export default function PageFavorites() {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 py-10 md:py-16 px-6 text-center">
      <Baby className="w-18 h-18 text-brand/30 mx-auto mb-4" />
      <h3 className="font-paperlogy text-xl mb-1 text-gray-800">
        즐겨찾기가 없습니다.
      </h3>
      <p className="text-sm text-muted-foreground font-anyvid mb-4">
        관심있는 이벤트에 줄겨찾기를 해보세요!
      </p>
    </div>
  );
}
