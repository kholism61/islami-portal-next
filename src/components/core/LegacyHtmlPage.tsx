import Script from "next/script";

import { loadLegacyHtml } from "@/lib/legacy-html";

export default function LegacyHtmlPage({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const page = loadLegacyHtml(source);

  return (
    <>
      {page.head.stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}

      {page.head.scripts.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}

      <div className={className ?? ""} dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
    </>
  );
}
