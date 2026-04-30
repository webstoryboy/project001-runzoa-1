"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { features, changelog } from "@/lib/data";

export default function PageAbout() {
  return (
    <div className="space-y-4">
      {/* 상단 소개 */}
      <section
        aria-label={`${APP_NAME} 서비스 소개`}
        className="rounded-2xl font-anyvid border border-dashed border-gray-200 p-4 md:p-6"
      >
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
          <div className="relative w-full overflow-hidden rounded-xl border border-gray-100 bg-white">
            <Image
              src="/runzoa.webp"
              alt={`${APP_NAME} 소개 이미지`}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="space-y-3 text-[15px] leading-relaxed text-muted-foreground break-keep">
            <h2 className="font-paperlogy text-2xl text-slate-900">
              안녕하세요! {APP_NAME}입니다.
            </h2>

            <p className="font-anyvid text-sm text-muted-foreground leading-relaxed">
              <strong>{APP_NAME}</strong>는 국내외 다양한 행사와 축제, 이벤트
              정보를 한 곳에서 쉽게 확인할 수 있도록 정리해 제공하는
              서비스입니다. 지역, 기간, 유형 등 다양한 기준으로 이벤트를 탐색할
              수 있도록 구성해 원하는 행사를 빠르게 찾을 수 있도록 돕습니다.
            </p>

            <p className="font-anyvid text-sm text-muted-foreground leading-relaxed">
              흩어져 있는 행사 정보를 한눈에 확인할 수 있도록 정리하고, 관심
              있는 이벤트를 저장해 두고 언제든 다시 확인할 수 있도록
              구성했습니다. {APP_NAME}는 더 많은 사람들이 다양한 행사와 이벤트를
              쉽고 편리하게 발견할 수 있도록 지속적으로 서비스를 개선해
              나가겠습니다. 이용 중 궁금한 점이나 추가되었으면 하는 행사 정보가
              있다면 언제든{" "}
              <Link
                href="/contact"
                className="text-brand hover:text-brand/70 underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                문의사항
              </Link>
              으로 남겨주세요.
            </p>
          </div>
        </div>
      </section>

      {/* 기능 소개 + 체인지 로그 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 기능 소개 */}
        <section
          aria-labelledby="features-heading"
          className="rounded-2xl border border-dashed border-gray-200 p-4 md:p-6"
        >
          <h2
            id="features-heading"
            className="font-paperlogy text-lg text-slate-900 mb-4 flex items-center gap-2"
          >
            <span className="inline-block w-1.5 h-5 bg-brand rounded-full" aria-hidden="true" />
            주요 기능
          </h2>
          <ul className="space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${feature.soon ? "bg-gray-100 text-gray-400" : "bg-brand/8 text-brand"}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-nanumNeo text-sm text-slate-800 flex items-center gap-2">
                      {feature.title}
                      {feature.soon && (
                        <span className="text-[10px] font-paperlogy font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400 leading-none">
                          Coming Soon
                        </span>
                      )}
                    </p>
                    <p className="font-anyvid text-sm text-muted-foreground leading-relaxed mt-0.5 break-keep">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 체인지 로그 */}
        <section
          aria-labelledby="changelog-heading"
          className="rounded-2xl border border-dashed border-gray-200 p-4 md:p-6"
        >
          <h2
            id="changelog-heading"
            className="font-paperlogy text-lg text-slate-900 mb-4 flex items-center gap-2"
          >
            <span className="inline-block w-1.5 h-5 bg-brand rounded-full" aria-hidden="true" />
            업데이트 내역
          </h2>
          <ol className="relative border-l border-gray-200 space-y-6 ml-1">
            {changelog.map((log) => (
              <li key={log.version} className="pl-5">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand ring-2 ring-brand/20"
                />
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-paperlogy uppercase font-semibold text-sm text-slate-900">
                    {log.version}
                  </span>
                  <span
                    className={`text-[10px] font-paperlogy font-semibold px-1.5 py-0.5 rounded-full leading-none ${
                      log.label === "Latest"
                        ? "bg-brand text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {log.label}
                  </span>
                  <span className="font-anyvid text-xs text-muted-foreground ml-auto">
                    {log.date}
                  </span>
                </div>
                <ul className="space-y-1" aria-label={`${log.version} 업데이트 항목`}>
                  {log.items.map((item) => (
                    <li
                      key={item}
                      className="font-anyvid text-sm text-muted-foreground flex items-center gap-1.5"
                    >
                      <span aria-hidden="true" className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
