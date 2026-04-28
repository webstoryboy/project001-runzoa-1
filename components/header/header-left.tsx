import Link from "next/link";
import { APP_ENG_NAME } from "@/lib/constants";

export default function HeaderLeft() {
  return (
    <Link
      href="/"
      className="flex h-11 items-center text-2xl uppercase font-paperlogy-black text-brand leading-none"
    >
      {APP_ENG_NAME}
    </Link>
  );
}
