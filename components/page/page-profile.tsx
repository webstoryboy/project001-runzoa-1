"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/contexts/context-logout";
import type { FullProfile } from "@/lib/types";
import { formatProfileDate, getProfileRoleLabel } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Camera,
  Eye,
  LogOut,
  Mail,
  Pencil,
  Shield,
  Trash2,
  UserIcon,
} from "lucide-react";

import DialogProfileName from "@/components/dialog/dialog-profile-name";
import DialogProfileImage from "@/components/dialog/dialog-profile-image";
import DialogProfileDelete from "@/components/dialog/dialog-profile-delete";

interface PageProfileProps {
  profile: FullProfile | null;
}

export default function PageProfile({ profile }: PageProfileProps) {
  const router = useRouter();
  const { logout } = useLogout();
  const [nameOpen, setNameOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name ?? null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? null);

  return (
    <div className="contact__container">
      <div className="flex flex-col items-center justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setImageOpen(true)}
          className="relative w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden cursor-pointer group"
        >
          <Image
            src={avatarUrl ?? "/face/face01.webp"}
            alt="프로필"
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </button>

        <div className="font-paperlogy text-base md:text-xl text-gray-900 flex items-center gap-2">
          {fullName ?? "이름 없음"}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNameOpen(true)}
            className="h-7 w-7 rounded-full p-0 bg-gray-100 hover:bg-gray-200"
          >
            <Pencil />
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4 mt-4">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              이름
            </p>
            <p className="text-sm font-anyvid text-foreground">
              {fullName ?? "-"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <Mail className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              이메일
            </p>
            <p className="text-sm font-anyvid text-foreground break-all">
              {profile?.email ?? "-"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              역할
            </p>
            <p className="text-sm font-anyvid text-foreground">
              {getProfileRoleLabel(profile?.role ?? null)}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              가입일
            </p>
            <p className="text-sm font-anyvid text-foreground">
              {formatProfileDate(profile?.created_at ?? null)}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
            <Eye className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              방문횟수
            </p>
            <p className="text-sm font-anyvid text-foreground">
              {profile?.visit_count != null ? `${profile.visit_count}회` : "-"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="md:pt-2 flex gap-2 justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-sm font-normal text-muted-foreground hover:bg-green-50 hover:border-green-600 hover:text-green-700 font-anyvid transition-colors flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="text-sm font-normal text-muted-foreground hover:bg-red-50 hover:border-red-300 hover:text-red-600 font-anyvid transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            탈퇴하기
          </Button>
        </div>
      </div>

      <DialogProfileName
        open={nameOpen}
        onOpenChange={setNameOpen}
        currentName={fullName}
        onUpdated={(newName) => {
          setFullName(newName);
          router.refresh();
        }}
      />
      <DialogProfileImage
        open={imageOpen}
        onOpenChange={setImageOpen}
        currentImage={avatarUrl}
        onUpdated={(newUrl) => {
          setAvatarUrl(newUrl);
          router.refresh();
        }}
      />
      <DialogProfileDelete open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
}
