
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FurniHouse Ethiopia | Furniture Made for Your Home",
  description:
    "Discover beautiful furniture, custom designs, beds, doors, storage and living room collections at FurniHouse Ethiopia.",
  keywords: [
    "FurniHouse Ethiopia",
    "Ethiopian furniture",
    "Custom furniture",
    "Beds",
    "Wooden doors",
    "Living room furniture",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
