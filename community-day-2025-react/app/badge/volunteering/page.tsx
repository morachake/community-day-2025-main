import type { Metadata } from "next";
import BadgePage from "@/components/badge/BadgePage";

export const metadata: Metadata = {
  title: "Volunteer badge · AWS Community Day Kenya",
};

const COPY_VOLUNTEER =
  " I am Volunteering AWS Community Day Kenya 2025. <br> awsusergroupkenya.co.ke<br>#aws #awsugke #AWSCommunityDay #AWSCommunityDayKE ";

export default function VolunteerBadgePage() {
  return (
    <BadgePage
      paragraphHtml={COPY_VOLUNTEER}
      backgrounds={{
        withPhoto: "/images/badge/6b.png",
        withoutPhoto: "/images/badge/10b.png",
      }}
      downloads={{
        withPhotoFilename: "badge.png",
        withoutPhotoFilename: "awsvolunteering.png",
      }}
    />
  );
}
