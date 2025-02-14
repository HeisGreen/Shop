import {NextResponse} from "next/server";
// let NEXT_KEY = "sk_test_51Qrg4lGAaBQOM1A3elOkRE3dB8gEgrSkBamoDpvuA738PJPRPideyjcDBfELPsgxW6kSgUQJd148APrmLelZRRo5007dpwvzWh"
const  stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

export const POST = async (request:any) => {

    const {products} = await request.json();
    let activeProducts = await stripe.products.list({active:true})

    // 1. find prods from stripe tha match cart products
try {
    for (const product of products) {
        const matchedProduct = activeProducts?.data?.find((stripeProduct:any) =>
            stripeProduct.name.toLowerCase() === product.name.toLowerCase()
        )
        // 2. if product doesn't exist in stripe, then add to stripe
        if (matchedProduct == undefined) {
            const prod = await stripe.products.create({
                name: product.name,
                default_price_data: {
                    currency: 'usd',
                    unit_amount:product.price*100
                },
            })
        }

    }
} catch (error){
    console.error("Error creating product", error)
    throw error;
}
    // 3. show updated catalog
    activeProducts = await stripe.products.list({active:true})

    let stripeProducts = []
    //     {
    //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //         price: '{{PRICE_ID}}',
    //         quantity: 1,
    //     },
    // ]

    for(const product of products) {
        const stripeProduct = activeProducts?.data?.find((stripeProduct:any) =>
            stripeProduct.name.toLowerCase() === product.name.toLowerCase()
        )
        if (stripeProduct) {
            stripeProducts.push(
                {
                    price: stripeProduct?.default_price,
                    quantity: product.quantity,
                }
            )
        }
    }


    const session = await stripe.checkout.sessions.create({
        line_items: stripeProducts,
        mode: 'payment',
        success_url: `https://shop-mwrmjltqi-chidos-projects-a434f02e.vercel.app/success`,
        cancel_url: `https://shop-mwrmjltqi-chidos-projects-a434f02e.vercel.app/`,
    });

    return NextResponse.json({
        url: session.url
    })
}
