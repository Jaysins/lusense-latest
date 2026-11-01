import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { Sidebar } from "./components/widgets/sidebar";
import SplashScreen from "./components/splash-screen";
import { AuthProvider } from "./state";
// import TopBar from "./components/widgets/topbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuSense App",
  description: "AI-powered interior design assistant",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col">
//         <SplashScreen />{" "}
//         <TooltipProvider>
//           <div className="flex gap-x-2">
//             <Sidebar />
//             <main className="md:ml-15">
//               <TopBar/>
//               {children}</main>
//           </div>
//         </TooltipProvider>
//       </body>
//     </html>
//   );
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider> {children}</AuthProvider>

        {/* <SplashScreen />
        <TooltipProvider>
          {children}
        </TooltipProvider> */}
      </body>
    </html>
  );
}
