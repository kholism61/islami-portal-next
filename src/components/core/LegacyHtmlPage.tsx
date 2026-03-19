import Script from "next/script";

import { loadLegacyHtml } from "@/lib/legacy-html";

type Props = {
  relFilePath: string;
};

export default function LegacyHtmlPage({ relFilePath }: Props) {
  const legacy = loadLegacyHtml(relFilePath);

  return (
    <>
      {legacy.head.stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}

      {legacy.head.scripts.map((script) => (
        <Script
          key={script.src}
          src={script.src}
          strategy="afterInteractive"
          type={script.type}
        />
      ))}

      <div dangerouslySetInnerHTML={{ __html: legacy.bodyHtml }} />
    </>
  );
}
