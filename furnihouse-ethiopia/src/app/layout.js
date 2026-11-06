
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FurniHouse Ethiopia | Furniture Made for Your Home",
  description:
    "Discover beautiful furniture, custom designs, beds, doors, storage and sofas collections at FurniHouse Ethiopia.",
  keywords: [
    "FurniHouse Ethiopia",
    "Ethiopian furniture",
    "Custom furniture",
    "Beds",
    "Wooden doors",
    "Sofas",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
