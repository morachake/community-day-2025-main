import type { Metadata } from "next";
import BadgePage from "@/components/badge/BadgePage";

export const metadata: Metadata = {
  title: "I will be attending · AWS Community Day Kenya",
};

const COPY_ATTENDING =
  " I am attending AWS Community Day Kenya 2025. <br> awsusergroupkenya.co.ke<br>#aws #awsugke #AWSCommunityDay #AWSCommunityDayKE ";

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
