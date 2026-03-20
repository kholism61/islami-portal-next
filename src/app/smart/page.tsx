import SmartHubClient from "@/components/smart-fiqh/SmartHubClient";

export const metadata = {
  title: "Smart Fiqh | Portal Literasi Islam",
};

export default function SmartPage() {
  return (
    <>
      <link rel="preload" as="style" href="/css/smart.css" />
      <link rel="stylesheet" href="/css/smart.css" />
      <SmartHubClient />
    </>
  );
}