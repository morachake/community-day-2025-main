import type { Metadata } from "next";
import BadgePage from "@/components/badge/BadgePage";

export const metadata: Metadata = {
  title: "I will be attending · AWS Community Day Kenya 2026",
};

const COPY_ATTENDING =
  "I'm attending AWS Community Day Kenya 2026 – Pwani Edition! 🚀<br>July 4, 2026 · Mombasa, Kenya<br>Join developers, cloud engineers, and tech enthusiasts for talks, hands-on sessions, and networking focused on AWS and modern cloud technologies. Learn, connect, and build.<br>awsusergroupkenya.co.ke<br>#AWSCommunityDay #AWSCommunityDayKE #AWSUGPwani #AWS #CloudComputing";

export default function AttendingBadgePage() {
  return (
    <BadgePage
      paragraphHtml={COPY_ATTENDING}
      backgrounds={{
        withPhoto: "/images/badge/6.png",
        withoutPhoto: "/images/badge/10.png",
      }}
      downloads={{
        withPhotoFilename: "badge.png",
        withoutPhotoFilename: "awsattending.png",
      }}
    />
  );
}
