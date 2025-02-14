import "./globals.css";
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
