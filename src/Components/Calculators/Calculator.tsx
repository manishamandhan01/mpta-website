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
            className="bg-white mt-40 rounded-lg bg-gradient-to-br from-gray-50 to-gray-200"
            sx={{ width: "80%", height:"100%"}} // Fixed height for the outer box
        >
            <TabContext value={value}>
                <Box sx={{ borderbottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Position Calculator" sx={{ border:1, borderColor: "divider" }}value="positionCalculator" />
                        <Tab label="RB Calculator" value="rbCalculator" />
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
