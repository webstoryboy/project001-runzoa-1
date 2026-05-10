import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchMarathonBySlug } from "@/lib/marathons";
import { formatMarathonDate } from "@/lib/utils";
import { APP_ENG_NAME, APP_NAME, APP_SITE_URL } from "@/lib/constants";

import DetailHeader from "@/components/detail/detail-header";
import DetailInfo from "@/components/detail/detail-info";
import DetailGallery from "@/components/detail/detail-gallery";
import DetailButtons from "@/components/detail/detail-buttons";
import DetailRegistration from "@/components/detail/detail-registration";
import DetailHosts from "@/components/detail/detail-hosts";
import DetailDday from "@/components/detail/detail-dday";
import DetailActions from "@/components/detail/detail-actions";
import DetailMap from "@/components/detail/detail-map";
import DetailComment from "@/components/detail/detail-comment";
import DetailRelated from "@/components/detail/detail-related";
import DetailMore from "@/components/detail/detail-more";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const marathon = await fetchMarathonBySlug(slug);

  if (!marathon) return { title: "대회를 찾을 수 없습니다" };

  const fallbackDescription = [
    marathon.name,
    marathon.event_start_at
      ? formatMarathonDate(marathon.event_start_at)
      : null,
    marathon.location_region,
    "마라톤 대회 정보, 참가 신청, 코스 안내",
  ]
    .filter(Boolean)
    .join(" · ");

  const description = marathon.description ?? fallbackDescription;

  const keywords = [
    marathon.name,
    marathon.name ? `${marathon.name} 런조아` : null,
    marathon.name ? `${marathon.name} 마라톤 접수` : null,
    marathon.name ? `${marathon.name} 마라톤 신청` : null,
    marathon.name ? `${marathon.name} 마라톤 참가비` : null,
    marathon.name ? `${marathon.name} 마라톤 접수 일정` : null,
    marathon.name ? `${marathon.name} 마라톤 참가 신청` : null,
    marathon.location_region ? `${marathon.location_region} 마라톤` : null,
    marathon.location_region ? `${marathon.location_region} 마라톤 접수` : null,
    marathon.location_area ? `${marathon.location_area} 마라톤` : null,
    marathon.location_place ? `${marathon.location_place} 마라톤` : null,
    marathon.year ? `${marathon.year} 마라톤 일정` : null,
    marathon.month ? `${marathon.month}월 마라톤 대회` : null,
    marathon.month ? `${marathon.month}월 마라톤 접수` : null,
    APP_NAME,
    APP_ENG_NAME,
  ]
    .filter(Boolean)
    .join(", ");

  const canonicalUrl = `${APP_SITE_URL}/marathon/${slug}`;
  const images = marathon.images_cover
    ? [{ url: marathon.images_cover, alt: `${marathon.name} 대회 커버 이미지` }]
    : [];

  return {
    title: marathon.name,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: APP_NAME,
      locale: "ko_KR",
      title: marathon.name,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: marathon.name,
      description,
      images: images.map((i) => i.url),
    },
  };
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const marathon = await fetchMarathonBySlug(slug);

  if (!marathon) return notFound();

  const canonicalUrl = `${APP_SITE_URL}/marathon/${slug}`;
  const fallbackDescription = [
    marathon.name,
    marathon.event_start_at
      ? formatMarathonDate(marathon.event_start_at)
      : null,
    marathon.location_region,
    "마라톤 대회 정보, 참가 신청, 코스 안내",
  ]
    .filter(Boolean)
    .join(" · ");
  const description = marathon.description ?? fallbackDescription;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: marathon.name,
    description,
    ...(marathon.event_start_at && { startDate: marathon.event_start_at }),
    ...(marathon.event_end_at && { endDate: marathon.event_end_at }),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name:
        marathon.location_place ??
        marathon.location_area ??
        marathon.location_region ??
        marathon.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: marathon.location_address ?? undefined,
        addressLocality: marathon.location_area ?? undefined,
        addressRegion: marathon.location_region ?? undefined,
        addressCountry:
          marathon.location_country === "대한민국"
            ? "KR"
            : (marathon.location_country ?? "KR"),
      },
      ...(marathon.location_lat &&
        marathon.location_lng && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: marathon.location_lat,
            longitude: marathon.location_lng,
          },
        }),
    },
    ...(marathon.images_cover && { image: marathon.images_cover }),
    url: marathon.event_site ?? canonicalUrl,
    ...(marathon.hosts_organizer && {
      organizer: {
        "@type": "Organization",
        name: marathon.hosts_organizer,
      },
    }),
    ...(marathon.registration_price &&
      Object.keys(marathon.registration_price).length > 0 && {
        offers: Object.entries(marathon.registration_price).map(
          ([name, price]) => ({
            "@type": "Offer",
            name,
            price,
            priceCurrency: "KRW",
            url: marathon.event_site ?? canonicalUrl,
            ...(marathon.registration_start_at && {
              validFrom: marathon.registration_start_at,
            }),
            ...(marathon.registration_end_at && {
              validThrough: marathon.registration_end_at,
            }),
          }),
        ),
      }),
  };

  return (
    <div className="detail__container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 마라톤 타이틀 및 설명 */}
      <DetailHeader name={marathon.name} description={marathon.description} />

      {/* 마라톤 정보(2칸) + 이미지(1칸) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <DetailInfo marathon={marathon} />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-1">
          <DetailGallery
            name={marathon.name}
            images_cover={marathon.images_cover}
          />
        </div>
      </div>

      {/* 버튼 영역(1칸) + 버튼 영역(1칸) + 버튼 영역(1칸) */}
      <DetailButtons event_site={marathon.event_site} />

      {/* 접수 정보(1칸) + 주최/주관(1칸) + 디데이(1칸) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DetailRegistration marathon={marathon} />
        <DetailHosts marathon={marathon} />
        <DetailDday marathon={marathon} />
      </div>

      {/* 공유하기 / 좋아요 / 즐겨찾기 / 댓글 / 알림설정 */}
      <DetailActions marathon={marathon} />

      {/* 네이버지도(2칸) + 댓글(1칸) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DetailMap marathon={marathon} />
        </div>
        <div className="lg:col-span-1">
          <DetailComment />
        </div>
      </div>

      {/* 해외 마라톤 대회 / 접수 중인 대회 / 같은 지역 대회 */}
      <DetailRelated marathon={marathon} />

      {/* 이번 달 대회 목록 테이블 */}
      <DetailMore />
    </div>
  );
}
