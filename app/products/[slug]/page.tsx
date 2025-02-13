
import React, {use} from 'react'
import {Navbar, ProductDetails} from "@/app/components";
import {useParams} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {groq} from "next-sanity";


const fetchProduct = async (slug: string) => {
    // Fetch all products and filter by slug
    const products = await client.fetch(groq`*[_type=="product"]`);
    return products.find((product: any) => product.slug.current === slug);
};

const page = async ({ params }: { params: { slug: string } }) => {
    const product = await fetchProduct(params.slug);

    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <>
            <Navbar/>
            <ProductDetails product={product} />
        </>
    )
}
export default page
