// app/products/[slug]/page.tsx

import React from "react";
import { Navbar, ProductDetails } from "@/app/components";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Fetch product data
const fetchProduct = async (slug: string) => {
  const query = groq`*[_type == "product" && slug.current == $slug][0]`;
  return client.fetch(query, { slug });
};

// Generate static paths for pre-rendering
export async function generateStaticParams() {
  const products = await client.fetch(groq`*[_type == "product"]{slug}`);
  return products.map((product: any) => ({
    slug: product.slug.current,
  }));
}

// Product page component
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
    </>
  );
}
