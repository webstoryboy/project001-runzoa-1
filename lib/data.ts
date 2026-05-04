import {
  MapPin,
  Globe,
  SlidersHorizontal,
  Bookmark,
  Bell,
  Trophy,
  ClipboardList,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  soon?: boolean;
}

export interface ChangelogItem {
  version: string;
  date: string;
  label: string;
  items: string[];
}

export interface NoticesItem {
  id: number;
  title: string;
  content: string;
  category: "중요" | "공지";
  date: string;
}

export interface FaqsItem {
  id: number;
  title: string;
  content: string;
  category: "이용" | "결제" | "기술";
}

export const features: FeatureItem[] = [
  {
    icon: MapPin,
    title: "마라톤 대회 정보",
    description:
      "전국 마라톤·하프·5K 대회 일정과 접수 정보를 한눈에 확인하세요.",
  },
  {
    icon: Globe,
    title: "해외 러닝 이벤트",
    description:
      "도쿄, 보스턴, 베를린 등 주요 해외 마라톤 대회 정보도 함께 제공합니다.",
  },
  {
    icon: SlidersHorizontal,
    title: "검색 & 필터",
    description: "지역·기간·거리별로 원하는 대회를 빠르게 찾을 수 있습니다.",
  },
  {
    icon: Bookmark,
    title: "즐겨찾기",
    description:
      "관심 대회를 저장해 두고 접수 일정을 놓치지 않도록 관리하세요.",
  },
  {
    icon: Bell,
    title: "접수 알림",
    description:
      "대회 접수 시작·마감 알림을 받아 중요한 일정을 챙길 수 있습니다.",
  },
  {
    icon: Trophy,
    title: "참가 이력 관리",
    description: "지금까지 참가한 대회를 기록하고 나의 러닝 여정을 돌아보세요.",
    soon: true,
  },
  {
    icon: ClipboardList,
    title: "러닝 기록 등록",
    description:
      "완주 기록과 페이스, 사진을 등록해 나만의 러닝 일지를 작성합니다.",
    soon: true,
  },
  {
    icon: Users,
    title: "커뮤니티",
    description:
      "러너들과 대회 후기, 훈련 팁, 코스 정보를 자유롭게 나눠보세요.",
    soon: true,
  },
];

export const notices: NoticesItem[] = [
  {
    id: 1,
    title: "런조아 서비스 소개",
    content:
      "런조아는 전국 마라톤과 해외 러닝 이벤트 정보를 한곳에 모아 더 쉽고 편리하게 확인할 수 있도록 정리한 서비스입니다. 흩어져 있는 대회 정보를 한눈에 살펴보고, 원하는 행사만 빠르게 찾아볼 수 있도록 구성했습니다.",
    category: "중요",
    date: "2026-04-30",
  },
  {
    id: 2,
    title: "국내외 러닝 이벤트 정보를 제공합니다",
    content:
      "국내 마라톤 대회는 물론, 도쿄·보스턴·베를린 등 주요 해외 러닝 이벤트 정보까지 함께 확인할 수 있습니다. 다양한 러닝 일정을 한 서비스 안에서 비교하고 탐색할 수 있도록 범위를 계속 확장하고 있습니다.",
    category: "공지",
    date: "2026-04-30",
  },
  {
    id: 3,
    title: "지역·기간·거리별 탐색을 지원합니다",
    content:
      "러너가 원하는 대회를 더 빠르게 찾을 수 있도록 지역, 기간, 거리 기준의 탐색 구조를 제공합니다. 필요한 정보만 간결하게 확인할 수 있도록 목록과 상세 정보 구성을 지속적으로 다듬고 있습니다.",
    category: "공지",
    date: "2026-04-30",
  },
  {
    id: 4,
    title: "관심 있는 대회는 저장해 다시 볼 수 있습니다",
    content:
      "즐겨찾기 기능을 통해 관심 있는 대회를 저장해 두고, 접수 일정이나 대회 정보를 다시 확인할 수 있습니다. 여러 대회를 비교하며 참가 계획을 세우는 사용자에게 더 편리한 흐름을 제공하는 데 집중하고 있습니다.",
    category: "공지",
    date: "2026-04-30",
  },
  {
    id: 5,
    title: "더 정확하고 보기 쉬운 정보 정리를 지향합니다",
    content:
      "런조아는 대회 일정, 접수 정보, 행사 분류를 한눈에 이해하기 쉽도록 정리하는 것을 중요하게 생각합니다. 복잡하게 흩어진 정보를 깔끔한 화면과 일관된 형식으로 제공해 탐색 부담을 줄이는 방향으로 운영하고 있습니다.",
    category: "공지",
    date: "2026-04-30",
  },
  {
    id: 6,
    title: "서비스는 계속 개선됩니다",
    content:
      "런조아는 더 많은 러너가 다양한 행사와 이벤트를 쉽게 발견할 수 있도록 기능과 데이터를 지속적으로 보완하고 있습니다. 이용 중 궁금한 점이나 추가되었으면 하는 정보가 있다면 문의사항을 통해 의견을 남겨주세요.",
    category: "공지",
    date: "2026-04-30",
  },
];

export const changelog: ChangelogItem[] = [
  {
    version: "v1.0.0",
    date: "2026.04",
    label: "Latest",
    items: [
      "서비스 초기 런칭",
      "전국 마라톤 대회 정보 제공",
      "즐겨찾기 기능",
      "회원가입 / 로그인",
    ],
  },
  {
    version: "v0.9.0",
    date: "2026.03",
    label: "Beta",
    items: [
      "베타 서비스 오픈",
      "해외 러닝 이벤트 추가",
      "검색 & 필터 기능",
      "반응형 UI 개선",
    ],
  },
  {
    version: "v0.5.0",
    date: "2026.01",
    label: "Alpha",
    items: [
      "알파 버전 내부 테스트",
      "기본 UI 설계",
      "데이터 구조 설계",
      "프로젝트 초기 세팅",
    ],
  },
];

export const faqs: FaqsItem[] = [
  {
    id: 1,
    title: "런조아(RunZoa)는 어떤 서비스인가요?",
    content:
      "런조아(RunZoa)는 마라톤과 러닝을 즐기는 사람들을 위한 러닝 대회 정보 플랫폼입니다. 전국 마라톤/러닝 대회를 한곳에서 쉽게 찾고, 일정·코스·참가비·접수 링크까지 빠르게 확인할 수 있도록 돕습니다.",
    category: "이용",
  },
  {
    id: 2,
    title: "런조아에서는 어떤 기능을 제공하나요?",
    content:
      "대회 일정 캘린더, 지역/거리(5K·10K·하프·풀) 필터, 대회 상세 정보(접수 기간·장소·코스·참가비), 즐겨찾기 저장, 관심 대회 모아보기 등 러너가 실제로 필요한 기능을 중심으로 제공합니다.",
    category: "이용",
  },
  {
    id: 3,
    title: "초보 러너도 이용할 수 있나요?",
    content:
      "네. 첫 5K부터 10K, 하프, 풀마라톤까지 목표에 맞는 대회를 찾을 수 있도록 구성되어 있어 초보 러너도 부담 없이 이용할 수 있습니다. 거리/난이도/지역으로 빠르게 추천받을 수 있어요.",
    category: "이용",
  },
  {
    id: 4,
    title: "유료 기능이나 결제 서비스가 있나요?",
    content:
      "기본 기능은 누구나 무료로 이용할 수 있습니다. 향후 프리미엄 기능(맞춤 알림, 추천 고도화, 기록 분석 등)이 추가될 수 있으며, 결제가 필요한 경우 요금제 페이지에서 충분히 안내드립니다.",
    category: "결제",
  },
  {
    id: 5,
    title: "관심 대회를 저장하고 관리할 수 있나요?",
    content:
      "네. 마음에 드는 대회를 즐겨찾기에 저장해두고, 나중에 한 번에 모아볼 수 있습니다. 로그인 후에는 저장한 목록을 다양한 기준으로 정리하고 빠르게 확인할 수 있어요.",
    category: "기술",
  },
];

export const precautions = [
  "대회 상세 일정, 코스, 참가비, 접수 일정 등은 주최 측 사정에 따라 변경될 수 있으니 반드시 공식 홈페이지에서 최종 정보를 확인하세요.",
  "본 사이트(RunZoa)는 마라톤 정보를 모아 제공하는 안내/중개 플랫폼으로, 대회 운영 및 접수 과정에 직접 관여하지 않습니다.",
  "참가 신청, 결제, 환불, 참가권 양도 등은 주최 측 규정에 따라 진행되며, 관련 문의는 공식 채널을 통해 확인해 주세요.",
  "대회 당일 교통 통제, 주차, 집결지 안내는 지역 상황에 따라 달라질 수 있으니 출발 전 공지사항을 확인하는 것을 권장합니다.",
  "안전한 참가를 위해 개인 건강 상태를 점검하고, 필요 시 의료진 상담 후 참가를 결정해 주세요.",
  "기상 상황에 따라 대회 운영 방식이 변경될 수 있으므로, 방한/방수 등 대비 장비를 준비하는 것을 권장합니다.",
  "현장에서는 안전요원의 안내 및 대회 규정을 준수해 주세요. 규정 시간 이후 출발 또는 코스 이탈 시 기록 측정이 제한될 수 있습니다.",
  "개인 물품 분실 및 부상 등에 대비하여 기본 안전 수칙을 준수하고, 귀중품은 최소화하는 것을 권장합니다.",
];
