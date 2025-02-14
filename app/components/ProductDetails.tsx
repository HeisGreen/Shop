"use client"

import React, {useContext, useState} from 'react'
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {CartContext} from "@/app/context/CartContext";

const ProductDetails = ({product}:any) => {
    const [index, setIndex] = useState(0);
    const { cartItems, addProduct, qty, incQty, decQty}:any = useContext(CartContext);
    console.log(cartItems);

    return (
        <div className="product-details-section">
            <div className="product-details-container">
                {/*left*/}
                <div>
                    {/*top*/}
                    <div className="sm: md:h-[450px]  flex items-center mb-[25px]">
                        <Image
                            loader={() => urlFor(product.images[index]).url()}
                            src={urlFor(product.images[index]).url()}
                            alt={product.images[0]}
                            width={350}
                            height={350}
                            className="object-contain mx-auto"
                        />
                    </div>
                    {/*bottom*/}
                    <div  className="small-images-container">
                        {product.images?.map((item:any, i:number)=> (
                            <Image
                                key={i}
                                loader={() => urlFor(product.images[i]).url()}
                                src={urlFor(product.images[i]).url()}
                                alt={product.images[0]}
                                width={350}
                                height={350}
                                className="object-contain sm:h-auto w-[90px] md:h-32 mx-auto border rounded-xl hover:cursor-pointer"
                                onClick = {()=>setIndex(i)}
                            />
                        ))}
                    </div>
                </div>
                {/*right*/}
                <div className='flex flex-col gap-8 md:pt-32 pt-0 '>
                    <div className="flex flex-col gap-4">
                        <div className="text-3xl font-bold">{product.name}</div>
                        <div className="tex-xl font-medium">${product.price}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h3>Quantity</h3>
                        <p className="quantity-desc flex items-center border-black">
                            <span className="minus"
                                  onClick={decQty}
                            >
                                <AiOutlineMinus/>
                            </span>
                            <span className="num">{qty}</span>
                            <span className="plus"
                                  onClick={incQty}>
                                <AiOutlinePlus/>
                            </span>
                        </p>
                    </div>
                    <button className="btn add-to-cart "
                    onClick={() => addProduct(product, qty)}
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails
