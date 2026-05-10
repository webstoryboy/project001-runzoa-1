import { Marathon } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  CalendarCheck,
  MapPin,
  Users,
  CircleDollarSign,
  ListChecks,
  Gift,
  Activity,
  Phone,
} from "lucide-react";
import {
  formatMarathonScale,
  formatMarathonPrice,
  formatMarathonLocation,
  formatMarathonEventPeriod,
  formatMarathonRegistrationPeriod,
} from "@/lib/utils";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5" aria-hidden="true">{icon}</span>
      <span className="w-16 shrink-0">{label}</span>
      <span className="flex-1 break-keep text-muted-foreground">{value}</span>
    </li>
  );
}

export default function DetailInfo({ marathon }: { marathon: Marathon }) {
  const location = formatMarathonLocation(marathon);
  const rows = [
    marathon.event_start_at
      ? { icon: <Calendar className="h-4 w-4 text-blue-500 shrink-0" />, label: "대회 기간", value: formatMarathonEventPeriod(marathon.event_start_at, marathon.event_end_at) }
      : null,
    marathon.registration_start_at
      ? { icon: <CalendarCheck className="h-4 w-4 text-indigo-500 shrink-0" />, label: "접수 기간", value: formatMarathonRegistrationPeriod(marathon.registration_start_at, marathon.registration_end_at) }
      : null,
    location !== "미정"
      ? { icon: <MapPin className="h-4 w-4 text-rose-500 shrink-0" />, label: "장소", value: location }
      : null,
    marathon.registration_price && Object.keys(marathon.registration_price).length > 0
      ? { icon: <Activity className="h-4 w-4 text-orange-500 shrink-0" />, label: "종목", value: Object.keys(marathon.registration_price).join(", ") }
      : null,
    marathon.registration_price && Object.keys(marathon.registration_price).length > 0
      ? { icon: <CircleDollarSign className="h-4 w-4 text-emerald-500 shrink-0" />, label: "참가비", value: formatMarathonPrice(marathon.registration_price) }
      : null,
    marathon.event_scale
      ? { icon: <Users className="h-4 w-4 text-sky-500 shrink-0" />, label: "규모", value: formatMarathonScale(marathon.event_scale) }
      : null,
    marathon.event_program
      ? { icon: <ListChecks className="h-4 w-4 text-violet-500 shrink-0" />, label: "프로그램", value: marathon.event_program }
      : null,
    marathon.event_souvenir
      ? { icon: <Gift className="h-4 w-4 text-pink-500 shrink-0" />, label: "기념품", value: marathon.event_souvenir }
      : null,
    marathon.hosts_phone
      ? { icon: <Phone className="h-4 w-4 text-amber-500 shrink-0" />, label: "연락처", value: marathon.hosts_phone }
      : null,
  ].filter(Boolean) as InfoRowProps[];

  return (
    <div className="detail__box">
      <div className="detail__title">
        <Clock className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
        <h2 className="font-paperlogy font-semibold text-lg">대회 정보</h2>
        {marathon.event_type && (
          <Badge variant="outline" className="ml-auto font-anyvid">
            {marathon.event_type}
          </Badge>
        )}
      </div>

      <div className="p-4 md:p-6">
        {rows.length === 0 ? (
          <p className="py-8 text-center font-anyvid text-sm text-muted-foreground">
            대회 정보가 없습니다.
          </p>
        ) : (
          <ul className="space-y-3 font-anyvid text-sm" aria-label="대회 정보 목록">
            {rows.map((row) => (
              <InfoRow key={row.label} {...row} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
