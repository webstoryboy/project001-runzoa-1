"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { faqs } from "@/lib/data";
import { ChevronRight, ChevronDown, Mails } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function PageContact() {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
        {/* 왼쪽: FAQ */}
        <div className="order-2 space-y-3 lg:order-1 lg:space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 hover:border-brand/40 hover:shadow-sm"
            >
              <details className="group">
                <summary className="list-none cursor-pointer px-4 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden [&::marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className="hidden shrink-0 text-xs sm:inline-flex">
                      {faq.category}
                    </Badge>
                    <span className="flex-1 font-anyvid text-sm text-gray-700 transition-colors group-open:text-brand">
                      {faq.title}
                    </span>
                    <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-brand group-open:hidden" />
                    <ChevronDown aria-hidden="true" className="hidden h-5 w-5 shrink-0 text-brand transition-all group-open:block" />
                  </div>
                </summary>

                <div className="border-t px-4 pb-4 pt-4 text-muted-foreground sm:px-6 sm:pb-5">
                  <Badge className="mb-3 inline-flex text-xs sm:hidden">
                    {faq.category}
                  </Badge>
                  <p className="font-anyvid text-sm leading-relaxed whitespace-pre-line">
                    {faq.content}
                  </p>
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* 오른쪽: 문의 작성 */}
        <div className="order-1 rounded-lg border border-gray-200 p-4 lg:order-2 lg:p-6">
          <div className="flex h-full flex-col">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src="/face/face05.webp"
                  alt="문의 안내 이미지"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <Badge className="mb-2 text-xs font-anyvid mr-1">
                  문의 접수
                </Badge>
                <Badge className="mb-2 text-xs font-anyvid">불편 접수</Badge>
                <h2 className="font-nanumNeo text-lg text-gray-900 sm:text-xl">
                  궁금한 내용을 남겨주세요
                </h2>
              </div>
            </div>

            <p className="mb-6 font-anyvid text-sm leading-relaxed text-muted-foreground border-t border-dashed pt-6">
              서비스 이용 중 궁금한 점이나 불편했던 부분, 개선 아이디어, 대회
              정보 수정 요청 등 다양한 의견을 언제든 편하게 남겨주세요.
            </p>

            <p className="sr-only" id="required-note">* 표시는 필수 입력 항목입니다.</p>
            <form
              className="flex flex-1 flex-col"
              aria-describedby="required-note"
              onSubmit={(event) => event.preventDefault()}
            >
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel
                    htmlFor="contact-email"
                    className="font-anyvid text-sm text-gray-800"
                  >
                    이메일
                    <span className="text-muted-foreground text-sm">
                      (답장이 필요한 경우 이메일로 전달됩니다.)
                    </span>
                  </FieldLabel>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="reply@runzoa.com"
                    className="font-anyvid"
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="contact-title"
                    className="font-anyvid text-sm text-gray-800"
                  >
                    제목<span className="star" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="contact-title"
                    name="title"
                    required
                    aria-required="true"
                    placeholder="문의 제목을 입력해 주세요"
                    className="font-anyvid"
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="contact-message"
                    className="font-anyvid text-sm text-gray-800"
                  >
                    문의 내용<span className="star" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-required="true"
                    placeholder="문의 내용을 자세히 적어주세요."
                    className="min-h-36 resize-none font-anyvid"
                  />
                </Field>
              </FieldGroup>

              <div className="flex gap-2 mt-6 pt-6 border-t border-dashed">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="font-anyvid flex-1"
                >
                  취소
                </Button>
                <Button
                  size="lg"
                  className="flex-1 font-anyvid bg-brand text-white hover:bg-brand/90"
                >
                  <Mails className="w-4 h-4" aria-hidden="true" />
                  문의하기
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
