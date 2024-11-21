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
            className="bg-white mt-24 rounded-lg bg-gradient-to-br from-gray-50 to-gray-200"
            sx={{ width: "100%", height:"100%"}} // Fixed height for the outer box
        >
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Position Calculator" value="positionCalculator" />
                        <Tab label="RB Calculator" value="rbCalculator" />
                    </TabList>
                </Box>
                <Box sx={{ height: "calc(100% - 48px)", p: 2, overflowY: "auto" }}>
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
