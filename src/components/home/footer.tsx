import { Clock, Facebook, Github, Linkedin, LocationEdit, Mail, Phone, Twitter, Youtube } from "lucide-react";

const Links = [
    {
        href:"/",
        label: "About us"
    },
    {
        href:"/",
        label: "Contact us"
    },
    {
        href:"/",
        label: "Terms & Conditions"
    },
    {
        href:"/",
        label: "Privacy Policy"
    },
    {
        href:"/",
        label: "FAQs"
    },
    {
        href:"/",
        label: "Help"
    },
]

const categories = [
    {
        label: "Mobiles"
    },
    {
        label: "Appliances"
    },
    {
        label: "Smartphones"
    },
    {
        label: "Air Conditioners"
    },
    {
        label: "Washing Machine"
    },
    {
        label: "Kitchen Appliances"
    },
    {
        label: "Gadget Accessories"
    },
]
export default function Footer(){
    return(
        <div className="lg:mx-auto mx-4 max-w-7xl mt-15 px-2" style={{ minHeight: "clamp(100px, 150vh, 250px)" }}>
            {/**Addresses */}
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 space-y-2  ">
                <div className="flex items-center gap-3">
                    <span>
                    <LocationEdit className="h-5 w-5 text-neutral-500"/>
                    </span>
                    <div>
                        <h3 className="font-bold">Visit Us</h3>
                        <p className="text-neutral-500 text-sm">New Orlean, USA</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span>
                    <Phone className="h-5 w-5 text-neutral-500"/>
                    </span>
                    <div>
                        <h3 className="font-bold">Call Us</h3>
                        <p className="text-neutral-500 text-sm">+12 958 648 597</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span>
                    <Clock className="h-5 w-5 text-neutral-500"/>
                    </span>
                    <div>
                        <h3 className="font-bold">Working Hours</h3>
                        <p className="text-neutral-500  text-sm">Mon - Sat 10:00 AM - 7:00 PM</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span>
                    <Mail className="h-5 w-5 text-neutral-500"/>
                    </span>
                    <div>
                        <h3 className="font-bold">Email Us</h3>
                        <p className="text-neutral-500 text-sm">decart@gmail.com</p>
                    </div>
                </div>
            </div>

            {/**Main Footer */}
            <div className="grid md:grid-cols-4 mt-8 gap-6 ">
                <div>
                    <div className="font-semibold text-2xl">DeCart</div>
                    <div className="text-neutral-500 text-sm my-4">Discover curated furniture collections at Shopcart, blending style and comfort to elevate your living spaces.</div>
                    <div className="flex gap-4 text-green-700 mt-2">
                        <Youtube />
                        <Github />
                        <Linkedin/>
                        <Facebook/>
                        <Twitter/>
                    </div>
                </div>
                {/**Quick Links */}
                <div>
                    <div className="font-semibold ">Quick Links</div>
                    {Links.map((link, index) =>(
                        <div key={index}>
                            <div className="text-neutral-500 hover:text-green-700 text-sm mt-5">
                                <a href={link.href} >{link.label}</a>
                            </div>
                        </div>
                    ))}
                </div>
                {/**Categories */}
                <div>
                    <div className="font-semibold ">Categories</div>
                    {categories.map((link, index) =>(
                        <div key={index}>
                            <div className="text-neutral-500 hover:text-green-700 cursor-pointer text-sm mt-5">{link.label}
                            </div>
                        </div>
                    ))}
                </div>
                {/**Newsletter */}
                <div className="flex flex-col max-w-[300px]">
                    <div className="font-semibold ">Newsletter</div>
                    <div className="text-neutral-500 text-sm my-4">Subscribe to our newsletter to recieve updates and exclusive offers.</div>
                    <input
                    type="text"
                    placeholder="Enter your email"
                    className="text-[16px] focus:outline-none w-full text-gray-400 px-4 py-2  border border-gray-400 rounded-lg my-3 "
                    />
                    <button className="bg-green-900 text-white py-2 rounded-lg">Subscribe</button>
                </div>
            </div>
            <div className="border-t border-gray-200 my-10 pt-6 text-center text-sm text-gray-500">
             © {new Date().getFullYear()} DeCart. All rights reserved.
        </div>
        </div>
    )
}