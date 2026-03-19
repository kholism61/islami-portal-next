import type { Metadata } from "next";

import "./mawaris.css";
import MawarisClient from "./MawarisClient";

export const metadata: Metadata = {
  title: "Kalkulator Mawaris",
};

export default function KalkulatorMawarisPage() {
  return <MawarisClient />;
}
