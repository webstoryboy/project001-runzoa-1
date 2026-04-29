import { basicMenu, guestMenu, userMenu } from "@/lib/menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import HeaderNavLink from "./header-nav-link";

export default function HeaderNav() {
  return (
    <ScrollArea className="flex-1 h-[calc(100vh-400px)] -mt-3 mb-12">
      <nav aria-label="사이드 메뉴" className="space-y-1 mt-1">
        {basicMenu.map((item) => (
          <HeaderNavLink key={item.href} item={item} />
        ))}

        <Separator className="my-2" />

        {guestMenu.map((item) => (
          <HeaderNavLink key={item.href} item={item} />
        ))}

        <Separator className="my-2" />

        {userMenu.map((item) => (
          <HeaderNavLink key={item.href} item={item} />
        ))}
      </nav>
    </ScrollArea>
  );
}
