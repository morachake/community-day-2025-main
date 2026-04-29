import type { Metadata } from "next";
import BadgePage from "@/components/badge/BadgePage";

export const metadata: Metadata = {
  title: "Organizer badge · AWS Community Day Kenya",
};

const COPY_ORGANIZER =
  " I am an organizer AWS Community Day Kenya 2025. <br> awsusergroupkenya.co.ke<br>#aws #awsugke #AWSCommunityDay #AWSCommunityDayKE ";

export default function OrganizerBadgePage() {
  return (
    <BadgePage
      paragraphHtml={COPY_ORGANIZER}
      backgrounds={{
        withPhoto: "/images/badge/6a.png",
        withoutPhoto: "/images/badge/10a.png",
      }}
      downloads={{
        withPhotoFilename: "badge.png",
        withoutPhotoFilename: "awsorganizer.png",
      }}
    />
  );
}
