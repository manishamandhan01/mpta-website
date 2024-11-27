import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Box } from "@mui/material";
import {PositionCalculatorB} from "@Components/Calculators/PositionCalculator(B).tsx";
import {RBCalculatorB} from "@Components/Calculators/RBCalculator(B).tsx";

export const CalculatorsB = () => {
    const [value, setValue] = useState("positionCalculator");

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
<>
    <div className="Hero-section p-4">

    </div>


        <Box
            className="  Hero-section    "

        >
            <div className=" container">
                <div className="calculator_main_table" >


                <div className=" row col-10 m-auto">
                    <TabContext value={value}>
                        <Box sx={{borderbottom: 2, borderColor: "black"}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Position Calculator" className="font_poppins font_weight_500 heading-24 line_height_24" sx={{
                                    color: value === "positionCalculator" ? "blue" : "inherit",
                                    borderRadius: "4px",
                                    fontWeight: value === "positionCalculator" ? "serif" : "normal",
                                    px: 2,
                                    mx: 1,
                                    textTransform: "none",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        color: "blue",
                                        border: value === "positionCalculator" ? 1 : 0,
                                        borderColor: value === "positionCalculator" ? "blue" : "transparent",

                                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                                    },
                                }}
                                     value="positionCalculator"/>
                                <Tab label="RB Calculator" className="font_poppins font_weight_500 heading-24 line_height_24"
                                     sx={{
                                         color: value === "rbCalculator" ? "blue" : "inherit",
                                         borderRadius: "4px",
                                         fontWeight: value === "rbCalculator" ? "serif" : "normal",
                                         px: 2,
                                         mx: 1,
                                         textTransform: "none",
                                         transition: "all 0.3s ease",
                                         "&:hover": {
                                             color: "blue",
                                             border: value === "rbCalculator" ? 1 : 0,
                                             borderColor: value === "rbCalculator" ? "blue" : "transparent",

                                             backgroundColor: "rgba(0, 0, 255, 0.1)",
                                         },
                                     }}
                                     value="rbCalculator"/>
                            </TabList>
                        </Box>
                        <Box sx={{height: "calc(100% - 48px)", m: 0, overflowY: "auto"}}>
                            {/* Adjust height to accommodate the tab list */}
                            <TabPanel value="positionCalculator">
                                <PositionCalculatorB/>
                            </TabPanel>
                            <TabPanel value="rbCalculator">
                                <RBCalculatorB/>
                            </TabPanel>
                        </Box>
                    </TabContext>
                </div>
                </div>
            </div>

        </Box>
        <div className="Hero-section p-4">


        </div>
</>
    );
};
