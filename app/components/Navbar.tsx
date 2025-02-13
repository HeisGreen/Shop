"use client"

import Link from "next/link";
import React, {useContext} from "react";
import { FaBagShopping } from "react-icons/fa6";
import Cart from "@/app/components/Cart";
import {CartContext} from "@/app/context/CartContext";


const Navbar = () => {
    const {totalQty, showCart, setShowCart}:any = useContext(CartContext);

    const handleClick = () => {
        setShowCart(!showCart);
    }
  return (
      <>
        <div className="w-full h-[80px] bg-white">
          <div className="container w-full h-full justify-between items-center flex">
            <Link className="logo" href="/">Shop</Link>
            <button className="cart-icon" onClick={handleClick}>
              <FaBagShopping/>
              <span className="cart-item-qty">{totalQty}</span>
            </button>
          </div>
        </div>;
          {showCart && <Cart/>}
       </>
  )
}
export default Navbar;
