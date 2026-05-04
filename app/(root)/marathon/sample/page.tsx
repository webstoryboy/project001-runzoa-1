import DetailActions from "@/components/detail/detail-actions";
import DetailButtons from "@/components/detail/detail-buttons";
import DetailMore from "@/components/detail/detail-more";
import DetailNotice from "@/components/detail/detail-notice";
import DetailReport from "@/components/detail/detail-report";
import DetailRelated from "@/components/detail/detail-related";
import DetailGallery from "@/components/detail/detail-gallery";
import DetailHeader from "@/components/detail/detail-header";
import DetailHosts from "@/components/detail/detail-hosts";
import DetailInfo from "@/components/detail/detail-info";
import DetailRegistration from "@/components/detail/detail-registration";
import DetailDday from "@/components/detail/detail-dday";
import DetailMap from "@/components/detail/detail-map";
import DetailComment from "@/components/detail/detail-comment";

export default function MarathonDetailPage() {
  return (
    <div className="detail__container">
      {/* detail__header  */}
      <DetailHeader />

      {/* 마라톤 정보(2칸) + 이미지(1칸) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <DetailInfo />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-1">
          <DetailGallery />
        </div>
      </div>

      {/* 버튼 영역(1칸) + 버튼 영역(1칸) + 버튼 영역(1칸 */}
      <DetailButtons />

      {/* Row 2: 접수 정보(1칸) + 주최/주관(1칸) + 관련 링크(1칸) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <DetailRegistration />
        </div>
        <div>
          <DetailHosts />
        </div>
        <div>
          <DetailDday />
        </div>
      </div>

      {/* 공유하기 / 종아요 / 즐겨찾기 / 댓글 / 알림설정 */}
      <DetailActions />

      {/* 네이버지도(2칸) + 댓글(1칸) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DetailMap />
        </div>
        <div className="lg:col-span-1">
          <DetailComment />
        </div>
      </div>

      {/* 해외 마라톤 대회 / 접수 중인 대회 / 같은 지역 대회 */}
      <DetailRelated />

      {/*전체 대회 목록 테이블 */}
      <DetailMore />

      {/* 주의사항 */}
      <DetailNotice />

      {/* 불편신고 / 문의사항 / 수정요청 */}
      <DetailReport />
    </div>
  );
}
