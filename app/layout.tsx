import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMO Reserva da Serra",
  description: "Sistema integrado de gestão de projetos do Reserva da Serra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
