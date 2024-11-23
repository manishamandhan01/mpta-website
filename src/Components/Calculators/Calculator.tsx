import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Box } from "@mui/material";
import { PositionCalculator } from "./PositionCalculator.tsx";
import { RBCalculator } from "./RBCalculator.tsx";

export const Calculators = () => {
    const [value, setValue] = useState("positionCalculator");

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box
            className="bg-white mt-24 rounded-xl bg-gradient-to-br from-gray-50 to-gray-200"

        >
            <TabContext value={value}>
                <Box sx={{ borderbottom: 2, borderColor: "black" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Position Calculator" sx={{
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
                        value="positionCalculator" />
                        <Tab label="RB Calculator"
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
                             value="rbCalculator" />
                    </TabList>
                </Box>
                <Box sx={{ height: "calc(100% - 48px)", m:0, overflowY: "auto" }}>
                    {/* Adjust height to accommodate the tab list */}
                    <TabPanel value="positionCalculator">
                        <PositionCalculator />
                    </TabPanel>
                    <TabPanel value="rbCalculator">
                        <RBCalculator />
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
};
