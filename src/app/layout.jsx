import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import "./globals.css";
import { Poppins } from "next/font/google";

// console.log("POPPINS  ==> ", Poppins);

const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}