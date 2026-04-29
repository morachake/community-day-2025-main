export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#232f3f",
        color: "#fff",
        fontFamily: "Roboto, sans-serif",
        textAlign: "center",
        gap: "24px",
      }}
    >
      <img
        src="/images/community-day-logo.png"
        alt="AWS Community Day Kenya"
        style={{ width: 180, opacity: 0.9 }}
      />
      <h1 style={{ fontSize: "72px", margin: 0, color: "#ff9900" }}>404</h1>
      <p style={{ fontSize: "20px", margin: 0, color: "rgba(255,255,255,0.8)" }}>
        Page not found
      </p>
      <a
        href="/"
        style={{
          marginTop: "8px",
          padding: "12px 32px",
          borderRadius: "50px",
          background: "#ff9900",
          color: "#fff",
          fontWeight: 600,
          textDecoration: "none",
          fontSize: "15px",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
