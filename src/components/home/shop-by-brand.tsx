import { Car, Headphones, ShieldCheck, ShoppingBasket } from "lucide-react";

export default function ShopByBranch (){
    const features = [
        {
            icon: Car,
            label: "Free Delivery",
            sublabel: "Free shipping over $100"
        },
        {
            icon: ShoppingBasket,
            label: "Free Return",
            sublabel: "Free shipping over $100"
        },
        {
            icon: Headphones,
            label: "Customer Support",
            sublabel: "Friendly 24/7 customer support"
        },
        {
            icon: ShieldCheck,
            label: "Money Back Guarantee",
            sublabel: "Quality checked by our team"
        }
    ]
    return(
        <div className="max-w-7xl mx-auto bg-neutral-100 lg:p-8 p-6">
            <div className="flex items-center justify-between">
                <div className="lg:text-3xl text-2xl font-semibold">Shop By Brands</div>
                <div>View all</div>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-6 space-y-6 md:space-y-0 ">
                {features.map((feature, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-3">
                            <feature.icon className="w-10 h-10 text-gray-500"/>
                            <div>
                                <h3 className="font-semibold">{feature.label}</h3>
                                <p>{feature.sublabel}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}