/** Serves legacy photobooth experience from `/public/photobooth.html` (full UI + scripts). */
export default function PhotoboothApp() {
  return (
    <iframe
      title="AWS Community Day Photobooth"
      src="/photobooth.html"
      style={{
        width: "100%",
        minHeight: "100vh",
        border: "none",
        display: "block",
      }}
    />
  );
}
