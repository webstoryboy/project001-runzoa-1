"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contacts, faqs, type ContactItem } from "@/lib/data";
import { contactSchema } from "@/lib/validations";
import { ContactFormValues } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import DialogContact from "@/components/dialog/dialog-alert-contact";

export default function PageContact({
  initialType = "inquiry",
  userEmail = "",
}: {
  initialType?: ContactItem["type"];
  userEmail?: string;
}) {
  // 문의 페이지에서 사용하는 UI 상태 관리
  const [selected, setSelected] = useState<ContactItem["type"]>(initialType);
  const [isLoading, setIsLoading] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // 현재 선택된 문의 유형에 맞는 표시 데이터 조회
  const current = contacts.find((t) => t.type === selected)!;
  const Icon = current.icon;

  // 문의 작성 폼 기본값과 유효성 검증 설정
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: userEmail,
      title: "",
      message: "",
    },
    mode: "onChange",
  });

  // 문의 유형 변경 시 관련 입력값 초기화
  const handleTypeChange = (type: ContactItem["type"]) => {
    setSelected(type);
    form.reset({ email: form.getValues("email"), title: "", message: "" });
  };

  // 문의 내용을 API로 전송하고 완료 상태를 처리
  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: selected }),
      });

      if (!response.ok) throw new Error("submit_failed");

      form.reset({ email: userEmail, title: "", message: "" });
      setContactOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("문의 접수 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-lg border border-dashed border-gray-200 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
          {/* 문의 전에 참고할 수 있는 자주 묻는 질문 영역 */}
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

          {/* 선택한 유형에 따라 실제 문의를 작성하는 입력 폼 영역 */}
          <div className="order-1 rounded-lg border border-gray-200 p-4 lg:order-2 lg:p-6">
            <div className="flex h-full flex-col">
              {/* 문의 유형을 전환하는 상단 선택 버튼 영역 */}
              <div
                role="group"
                aria-label="문의 유형 선택"
                className="mb-5 grid grid-cols-3 gap-2"
              >
                {contacts.map(({ type, label, icon: TypeIcon }) => (
                  <Button
                    key={type}
                    type="button"
                    variant={selected === type ? "default" : "ghost"}
                    className="gap-1.5 font-anyvid"
                    aria-pressed={selected === type}
                    onClick={() => handleTypeChange(type)}
                  >
                    <TypeIcon aria-hidden="true" className="h-3 w-3" />
                    {label}
                  </Button>
                ))}
              </div>

              {/* 현재 선택된 문의 유형의 안내 정보를 보여주는 헤더 영역 */}
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
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* 이메일, 제목, 내용을 입력하는 핵심 문의 작성 필드 영역 */}
                <FieldGroup className="gap-4">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contact-email">
                          이메일
                          <span className="text-sm text-muted-foreground">
                            (답장이 필요한 경우 이메일로 전달됩니다.)
                          </span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="contact-email"
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="reply@runzoa.com"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contact-title">
                          제목
                          <span className="star" aria-hidden="true">
                            *
                          </span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="contact-title"
                          aria-invalid={fieldState.invalid}
                          aria-required="true"
                          placeholder={`${current.label} 제목을 입력해 주세요`}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="contact-message">
                          내용
                          <span className="star" aria-hidden="true">
                            *
                          </span>
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="contact-message"
                          aria-invalid={fieldState.invalid}
                          aria-required="true"
                          placeholder={current.placeholder}
                          className="min-h-44"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* 입력 초기화와 문의 제출을 처리하는 하단 액션 버튼 영역 */}
                <div className="mt-6 flex gap-2 border-t border-dashed pt-6">
                  <Button
                    type="button"
                    size="lg"
                    variant="ghost"
                    className="flex-1 font-anyvid"
                    onClick={() =>
                      form.reset({ email: "", title: "", message: "" })
                    }
                    disabled={isLoading}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 gap-2 font-anyvid bg-brand text-white hover:bg-brand/90"
                    disabled={isLoading}
                    aria-busy={isLoading}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {isLoading ? "접수 중..." : current.buttonLabel}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 문의 접수 완료 후 보여주는 안내 다이얼로그 */}
      <DialogContact open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
}
