import { APP_INSTAGRAM_URL } from "@/lib/constants";
import Image from "next/image";

export default function DetailGallery() {
  return (
    <div className="detail__gallery relative h-full border border-gray-200 rounded-2xl overflow-hidden">
      <a
        href={APP_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full hover:opacity-80 transition-opacity"
        aria-label="런조아 인스타그램 보기"
      >
        <img
          src="/svg/instagram.svg"
          alt=""
          width={20}
          height={20}
          className="invert"
          aria-hidden="true"
        />
      </a>
      <div className="flex flex-col gap-0 p-4">
        <div className="relative w-full bg-gray-100">
          <Image
            src="/marathon/cover/4th-bamseom-marathon.jpg"
            alt="2026 세이브더칠드런 국제어린이마라톤 창원 대회 현장"
            width={800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
