import type { Metadata } from "next";
import PhotoboothApp from "@/components/photobooth/PhotoboothApp";

export const metadata: Metadata = {
  title: "Photobooth · AWS Community Day Kenya",
  robots: { index: false, follow: true },
};

export default function PhotoboothPage() {
  return <PhotoboothApp />;
}
