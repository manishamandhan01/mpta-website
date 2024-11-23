export  const Footer =()=>{
    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-200 text-gray-400 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-96">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <a href="#" className="group relative block w-20 h-14">
                                <img
                                    className="w-full h-full object-cover shadow-md transform transition-transform group-hover:scale-105"
                                    src="06.png"
                                    alt="Logo"
                                />
                            </a>
                            <h1 className="text-blue-700 text-3xl font-bold mt-4">Trade Analyzer</h1>
                        </div>
                        <p className="mt-4 text-sm text-black">Tools for futures, currency &amp; options involves
                            substantial
                            risk &amp; is not appropriate
                            for everyone. Only risk capital should be used for trading. Testimonials appearing on this
                            website may not be representative of other clients or customers and is not a guarantee of
                            future performance or success.</p>
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-12 w-full">
                        <div>
                            <h2 className="text-black  mb-4">Explore</h2>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">Log In</a></li>
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Broker Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-black  mb-4">Legal</h2>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-black  mb-4">Follow Us</h2>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white">Twitter</a></li>
                                <li><a href="#" className="hover:text-white">Instagram</a></li>
                                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-white">Facebook</a></li>
                            </ul>

                        </div>

                    </div>

                </div>
                <div className="mt-8 text-center border-t border-gray-700 pt-4">
                    <p>Trade Analyzer. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}