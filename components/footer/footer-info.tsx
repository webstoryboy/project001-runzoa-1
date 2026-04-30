import Link from "next/link";
import { footerMenu, socialMenu } from "@/lib/menu";
import { APP_ENG_NAME, APP_SLOGAN, APP_DESCRIPTION } from "@/lib/constants";

export default function FooterInfo() {
  return (
    <div className="border-t border-gray-300/40 pt-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl uppercase font-paperlogy font-black">
          {APP_ENG_NAME}
        </p>
        <div className="flex items-center gap-3">
          {socialMenu.map(({ href, label, path }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d={path} fill="currentColor" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      <p className="font-anyvid text-sm text-muted-foreground leading-5 mb-2">
        <span className="block mb-1 uline">{APP_SLOGAN}</span>
        {APP_DESCRIPTION}
      </p>

      <div className="flex items-center flex-wrap gap-3 text-sm font-anyvid text-muted-foreground">
        {footerMenu.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
