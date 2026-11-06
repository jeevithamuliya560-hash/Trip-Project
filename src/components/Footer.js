import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <Link className="logo" href="/home">Trip<span>Mate</span></Link>
      <p>Make room for the journey.</p>
      <span>Plan thoughtfully. Travel freely.</span>
    </footer>
  );
}