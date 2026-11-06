import "./globals.css";
import { TripProvider } from "@/context/TripContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TripMate | Plan your next adventure",
  description: "Explore destinations and plan trips with TripMate.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TripProvider>
          <Navbar />
          <div className="site-content">{children}</div>
          <Footer />
        </TripProvider>
      </body>
    </html>
  );
}
