import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In | Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function SignInPage() {
  redirect("/");
}