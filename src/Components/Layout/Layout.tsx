import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { MiddleSection } from "./MiddleSection.tsx";
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <div
                className="relative min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage: 'url("/public/sl_022321_41020_35.jpg")',
                }}
            >
                <Header />
                <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-60">
                    <div className="text-center p-12  bg-opacity-90 rounded-lg shadow-lg max-w-3xl">
                        <MiddleSection />
                    </div>
                </div>
            </div>

            <Footer />
            <Outlet/>
        </>



    );
};
