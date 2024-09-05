import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProviderLayout from "./ProviderLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Courses Academy",
  description: "Courses Academy, Hussein Elged",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderLayout>
          <main>
            <Header />
            {modal}
            {children}
            <Footer />
          </main>
        </ProviderLayout>
      </body>
    </html>
  );
}
