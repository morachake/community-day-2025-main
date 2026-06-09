import type { Metadata } from "next";
import BadgePage from "@/components/badge/BadgePage";
import { VOLUNTEERING_PWANI_LAYOUT } from "@/lib/badge/attendingBadgeCanvas";

export const metadata: Metadata = {
  title: "I will be volunteering · AWS Community Day Kenya 2026",
};

const COPY_VOLUNTEER =
  "I'm volunteering at AWS Community Day Kenya 2026 – Pwani Edition! 🙌<br>July 4, 2026 · Mombasa, Kenya<br>Helping make Kenya's biggest AWS community event happen. Join us for talks, hands-on sessions, and networking focused on AWS and modern cloud technologies.<br>awsusergroupkenya.co.ke<br>#AWSCommunityDay #AWSCommunityDayKE #AWSUGPwani #AWS #CloudComputing";

export default function VolunteerBadgePage() {
  return (
    <BadgePage
      paragraphHtml={COPY_VOLUNTEER}
      backgrounds={{
        withPhoto: "/images/badge/volunteering-pwani-template.png",
      }}
      downloads={{
        withPhotoFilename: "aws-community-day-kenya-2026-volunteering-badge.png",
      }}
      showWithoutPhotoCard={false}
      useCanvasBuilder
      canvasLayout={VOLUNTEERING_PWANI_LAYOUT}
    />
  );
}
