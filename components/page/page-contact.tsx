"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { contactTypes, faqs, type ContactType } from "@/lib/data";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function PageContact({
  initialType = "inquiry",
}: {
  initialType?: ContactType;
}) {
  const [selected, setSelected] = useState<ContactType>(initialType);

  const current = contactTypes.find((t) => t.type === selected)!;
  const Icon = current.icon;

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
                    <ChevronRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-brand group-open:hidden"
                    />
                    <ChevronDown
                      aria-hidden="true"
                      className="hidden h-5 w-5 shrink-0 text-brand transition-all group-open:block"
                    />
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
            {/* 유형 선택 */}
            <div
              role="group"
              aria-label="문의 유형 선택"
              className="mb-5 grid grid-cols-3 gap-2"
            >
              {contactTypes.map(({ type, label, icon: TypeIcon }) => (
                <Button
                  key={type}
                  variant={selected === type ? "default" : "ghost"}
                  className="gap-1.5 font-anyvid"
                  aria-pressed={selected === type}
                  onClick={() => setSelected(type)}
                >
                  <TypeIcon className="h-3 w-3" />
                  {label}
                </Button>
              ))}
            </div>

            {/* 헤더 */}
            <div className="mb-5 flex items-center gap-3 border-b border-dashed pb-5">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={current.imageSrc}
                  alt={current.imageAlt}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <Badge
                  variant="ghost"
                  className="mb-1 mr-1 font-anyvid text-xs"
                >
                  {current.badgeText}
                </Badge>
                <h2 className="font-nanumNeo text-lg text-gray-900 sm:text-xl">
                  {current.heading}
                </h2>
              </div>
            </div>

            <p className="sr-only" id="required-note">
              * 표시는 필수 입력 항목입니다.
            </p>
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
                    <span className="text-sm text-muted-foreground">
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
                    제목
                    <span className="star" aria-hidden="true">
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="contact-title"
                    name="title"
                    required
                    aria-required="true"
                    placeholder={`${current.label} 제목을 입력해 주세요`}
                    className="font-anyvid"
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="contact-message"
                    className="font-anyvid text-sm text-gray-800"
                  >
                    내용
                    <span className="star" aria-hidden="true">
                      *
                    </span>
                  </FieldLabel>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-required="true"
                    placeholder={current.placeholder}
                    className="min-h-36 resize-none font-anyvid"
                  />
                </Field>
              </FieldGroup>

              <div className="mt-6 flex gap-2 border-t border-dashed pt-6">
                <Button
                  type="button"
                  size="lg"
                  variant="ghost"
                  className="flex-1 font-anyvid"
                >
                  취소
                </Button>
                <Button
                  size="lg"
                  className="flex-1 gap-2 font-anyvid bg-brand text-white hover:bg-brand/90"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {current.buttonLabel}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
