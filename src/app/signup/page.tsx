import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up | Portal Literasi Islam",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function SignUpPage() {
  redirect("/");
}