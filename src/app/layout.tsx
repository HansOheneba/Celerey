import "@/styles/globals.css";
import localFont from "next/font/local";

const ppCirka = localFont({
  src: [
    {
      path: "./fonts/PP Cirka/PPCirka-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PP Cirka/PPCirka-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PP Cirka/PPCirka-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PP Cirka/PPCirka-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-cirka",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ppCirka.variable}>
      <body className="font-helvetica">{children}</body>
    </html>
  );
}
