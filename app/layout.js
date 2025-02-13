 import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components";
 import {CartProvider} from "@/app/context/CartContext";

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body>
        <CartProvider>
            <div>
                {children}
            </div>
        </CartProvider>
      </body>
    </html>
  );
}
