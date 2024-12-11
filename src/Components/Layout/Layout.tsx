// import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import {HeaderB} from "@Components/Layout/Header(Bootstrap).tsx";
import {MiddleSectionB} from "@Components/Layout/MiddleSection(Bootstrap).tsx";
import {FooterB} from "@Components/Layout/Footer(Bootstrap).tsx";

export const Layout = () => {
    const open = false;
    const location = useLocation();

    const isChartPage = location.pathname === '/charts';


    return (
        <div className={isChartPage? "mainDiv" : ""}>
            {!isChartPage && <HeaderB/>}

            {open ? (
                <MiddleSectionB/>
            ) : (
                <Outlet/>
            )}


            {/* Footer at the bottom */}
            {!isChartPage && <FooterB/>}
        </div>
    );
};
