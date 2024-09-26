import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import "./globals.css";
import { LogOut } from "lucide-react";
import { signOutAction } from "./actions";
import { Button } from "@/components/ui/button";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Law Firm RAG",
  description: "Envie e analise seus documentos com a IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col items-center px-10">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full flex justify-between items-center text-sm">
                <div className="flex items-center text-4xl font-bold text-primary">
                  <Link href={"/"}>Airdoc</Link>
                </div>
                <form action={signOutAction}>
                  <Button type="submit" variant="ghost" size="icon" className="rounded-full">
                    <LogOut />
                  </Button>
                </form>
              </div>
            </nav>
            <div className="w-full py-5">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
