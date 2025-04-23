// import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import {HeaderB} from "@Components/Layout/Header(Bootstrap).tsx";
import {HomePage} from "@Components/Layout/HomePage.tsx";
import {FooterB} from "@Components/Layout/Footer(Bootstrap).tsx";
import {AboutUsPage} from "@Components/Layout/AboutUsPage.tsx";

export const Layout = () => {
    const open = false;
    const location = useLocation();

    const isChartPage = location.pathname === '/charts';


    return (
        <div className={isChartPage? "mainDiv" : ""}>
            {!isChartPage && <HeaderB/>}

            {open ? (
                <HomePage/>
            ) : (
                <Outlet/>
            )}


            {/* Footer at the bottom */}
            {!isChartPage && <FooterB/>}
        </div>
    );
};
