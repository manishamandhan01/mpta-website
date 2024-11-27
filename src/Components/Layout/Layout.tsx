// import React from "react";
import {Outlet} from "react-router-dom";
import {HeaderB} from "@Components/Layout/Header(Bootstrap).tsx";
import {MiddleSectionB} from "@Components/Layout/MiddleSection(Bootstrap).tsx";
import {FooterB} from "@Components/Layout/Footer(Bootstrap).tsx";

export const Layout = () => {
    const open = false;


    return (
        <div
            className=""

        >
            <HeaderB />


                {open ? (

                        <MiddleSectionB />

                ) : (
                    <Outlet />
                )}


            {/* Footer at the bottom */}
            <FooterB />
        </div>
    );
};
