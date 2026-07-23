import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radar Jogo a Jogo — Dados e Estatísticas",
  description:
    "Dados ao vivo, estatísticas e análises independentes para decisões mais informadas.",
};

export default function RadarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
