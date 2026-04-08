import WallCalendar from "@/components/WallCalendar";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "var(--cream)",
      }}
    >
      <WallCalendar />
    </main>
  );
}
