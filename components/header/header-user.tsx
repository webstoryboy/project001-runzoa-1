import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile } from "@/lib/types";

interface HeaderUserProps {
  profile: Profile | null;
}

export default function HeaderUser({ profile }: HeaderUserProps) {
  return (
    <div className="p-4 border-b border-brand/5 bg-brand/5 -mt-4">
      <div className="text-center py-2">
        <div className="flex justify-center mb-2">
          <Avatar className="w-16 h-16 border-2 border-brand/10">
            <AvatarImage
              src={profile?.avatar_url ?? "/face/face01.webp"}
              alt="프로필 이미지"
              className="bg-brand/10"
            />
            <AvatarFallback className="bg-brand/10 text-brand text-3xl font-paperlogy pt-1">
              {profile?.full_name?.[0]?.toUpperCase() ?? "R"}
            </AvatarFallback>
          </Avatar>
        </div>
        {profile ? (
          <>
            <p className="font-paperlogy font-normal text-lg text-gray-900 mb-1">
              {profile.full_name ?? "이름 없음"}님 환영합니다!
            </p>
            <p className="font-nanumNeo text-sm text-muted-foreground truncate">
              {profile.email}
            </p>
          </>
        ) : (
          <>
            <p className="font-paperlogy font-normal text-lg text-gray-900 mb-1">
              환영합니다!
            </p>
            <p className="font-anyvid text-sm text-muted-foreground truncate">
              로그인하여 더 많은 기능을 사용해보세요.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
