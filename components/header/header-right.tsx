import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";

export default function HeaderRight() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="열기"
      className="h-11 w-11 rounded-full hover:border hover:border-brand bg-brand text-white hover:bg-white hover:text-brand overflow-hidden p-0"
    >
      <Medal className="w-5 h-5" aria-hidden="true" />
    </Button>
  );
}
