import { client } from "../sanity/lib/client";
import { groq } from "next-sanity";
import {Hero, Navbar} from "../app/components";
import {Products} from "../app/components";

export default async function Home() {
  const products = await client.fetch(groq `*[_type=="product"]`)
  console.log(products)
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    // </div>
    <>
      <Navbar/>
      <Hero/>
        <Products/>
    </>
  );
}
