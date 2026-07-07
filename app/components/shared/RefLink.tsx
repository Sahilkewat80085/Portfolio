import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

export default function RefLink({
  href,
  children,
  className,
  target = "_blank",
}: {
  href: Url;
  children?: React.ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}) {
  const isHash = typeof href === "string" && (href === "#" || href.startsWith("#"));
  const resolvedTarget = isHash ? undefined : target;
  const resolvedRel = isHash
    ? undefined
    : resolvedTarget === "_blank"
    ? "noopener noreferrer"
    : "noopener";

  return (
    <Link
      href={href}
      rel={resolvedRel}
      target={resolvedTarget}
      className={className}
    >
      {children}
    </Link>
  );
}
