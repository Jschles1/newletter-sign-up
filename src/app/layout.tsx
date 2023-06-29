import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["cyrillic"] });

{
  /* <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
<title>Frontend Mentor | Newsletter sign-up form with success message</title> */
}

export const metadata = {
  title: "Frontend Mentor",
  description: "Newsletter sign-up form with success message",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} sm:bg-charcoal-grey`}>
        {children}
      </body>
    </html>
  );
}
