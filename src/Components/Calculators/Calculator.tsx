import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Box } from "@mui/material";
import { PositionCalculator } from "./PositionCalculator.tsx";

export const Calculators = () => {
    const [value, setValue] = useState("1");

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className="mt-6 mt-md-0 col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Position Calculator" value="1" />
                        <Tab label="RB Calculator" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <PositionCalculator />
                </TabPanel>
                <TabPanel value="2">
                    <p>RB Calculator</p>
                </TabPanel>
            </TabContext>
        </div>
    );
};
