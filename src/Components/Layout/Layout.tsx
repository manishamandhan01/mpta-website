import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MiddleSection } from "./MiddleSection";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-white"
            // style={{
            //     backgroundImage: `url("/sl_022321_41020_35 (2).jpg")`,
            // }}
        >
            <Header />

            <main className="flex items-center justify-center min-h-screen bg-opacity-50 bg-white" >
                {open ? (
                    <div className="text-center p-12 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-3xl">
                        <MiddleSection />
                    </div>
                ) : (
                    <Outlet />
                )}
            </main>

            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
};
