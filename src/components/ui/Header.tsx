"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { clx } from "@/utils";

export const Header = () => {
  const pathname = usePathname();
  return (
    <h1 className="text-2xl text-gray-700 sm:px-4 mb-8">
      Timeline Generator
      <span className="inline-flex items-center ml-5 gap-3 text-lg">
        <Link
          href="/"
          className={clx(pathname === "/" && "text-blue-500 underline")}
        >
          v1
        </Link>
        <Link
          href="/v2"
          className={clx(pathname === "/v2" && "text-blue-500 underline")}
        >
          v2
        </Link>
      </span>
    </h1>
  );
};

Header.displayName = "Header";
