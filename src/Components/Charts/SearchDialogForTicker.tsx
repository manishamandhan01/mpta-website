import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import DialogActions from "@mui/material/DialogActions";
import React, {useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {SearchDialogTickerList} from "@Components/Lists/SearchDialogTickerList.tsx";
import {TickersListModel} from "@Components/Models/TickersListModel.tsx";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


interface IProps {
    dialogOpen: boolean;
    dialogClose : () => void;
}


export const SearchDialogForTicker: React.FC<IProps> = ({dialogOpen, dialogClose}) => {
    const [tickersData, setTickersData] = React.useState<TickersListModel[] | undefined>(undefined);
    const [searchticker, setSearchticker] = useState("");


    const handleInputChange = (ticker: TickersListModel) => {
        setSearchticker(ticker.name || "");
    };


    const fetchTickers = () => {
        fetch('http://localhost:8000/stockapis/v1/tickers?format=json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(res => res.json())
            .then(json => {
                setTickersData(json.results);

            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchTickers();
    }, []);

    const filterTickers = tickersData?.filter(ticker =>
        // Ensure ticker properties are not undefined
        (ticker.name && ticker.name.toLowerCase().includes(searchticker.toLowerCase())) ||
        (ticker.ticker && ticker.ticker.toLowerCase().includes(searchticker.toLowerCase()))
    );

    return (
        <>
            <Dialog className="searchDialogForTicker"
                    fullWidth
                    open={dialogOpen}
                    maxWidth="md"
                    onClose={dialogClose}


            >
                <DialogTitle className="font_weight_700  font_Epilogue heading-48 text-bold line_height_72 ">Symbol
                    Search


                </DialogTitle>
                <DialogContent className="p-0" style={{height: '600px'}}>
                    <DialogContentText>

                    </DialogContentText>
                    <Box
                        className="m-0 w-100"
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >


                        <TextField
                            className="searchInputTicker "
                            id="standard-basic"
                            // label="Search Ticker"
                            variant="standard"
                            value={searchticker}
                            onChange={(e) => setSearchticker(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                        {/*<AddIcon/>*/}
                                        {/*<RemoveIcon/>*/}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Stack direction="row" spacing={2}>

                            <Button variant="outlined">All</Button>

                            <Button className="ms-1" variant="outlined" href="#outlined-buttons">
                                Stocks
                            </Button>


                        </Stack>
                        <FormControl sx={{mt: 2,}}>
                            <SearchDialogTickerList tickersList={filterTickers} onSelectTicker={handleInputChange}/>

                        </FormControl>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}