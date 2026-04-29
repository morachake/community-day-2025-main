import Agenda from "@/components/home/Agenda";
import AgendaSummary from "@/components/home/AgendaSummary";
import CommunityInfo from "@/components/home/CommunityInfo";
import Countdown from "@/components/home/Countdown";
import Hero from "@/components/home/Hero";
import Keynote from "@/components/home/Keynote";
import Organizers from "@/components/home/Organizers";
import ArchiveCta from "@/components/home/ArchiveCta";
import Speakers from "@/components/home/Speakers";
import Sponsors from "@/components/home/Sponsors";
import Subscribe from "@/components/home/Subscribe";
import Venue from "@/components/home/Venue";
import Volunteers from "@/components/home/Volunteers";
import Workshops from "@/components/home/Workshops";
import Footer from "@/components/layout/Footer";
import FloatingToast from "@/components/layout/FloatingToast";
import VideoModal from "@/components/shared/VideoModal";

export default function HomePage() {
  return (
    <>
      <div id="page">
        <Hero />
        <Keynote />
        <Speakers />
        <Agenda />
        <ArchiveCta />
        <VideoModal />
        <CommunityInfo />
        <Countdown />
        <Venue />
        <AgendaSummary />
        <Workshops />
        <Sponsors />
        <Organizers />
        <Volunteers />
        <Subscribe />
      </div>
      <Footer />
      <FloatingToast />
    </>
  );
}
