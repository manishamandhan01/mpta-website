import React from "react";
import {TickersListModel} from "@Components/Models/TickersListModel.tsx";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';


interface IProps{
    tickersList: TickersListModel[] | undefined;
    onSelectTicker: (ticker: TickersListModel) => void;
}
export const SearchDialogTickerList: React.FC<IProps> = ({tickersList, onSelectTicker}) => {
    if (!tickersList || tickersList.length === 0) {
        return <div>No tickers available</div>; // Display a message if tickers are undefined or empty
    }
    else


    return (
        <>
            <List>
                {tickersList.map((ticker) => (
                <ListItem>
                    <ListItemButton onClick={() => onSelectTicker(ticker)}>
                        <ListItemDecorator>{ticker.name ? ticker.name : 'Unknown Name'}</ListItemDecorator>
                        <ListItemContent>{ticker.ticker ? ticker.ticker : 'Unknown Ticker'}</ListItemContent>
                    </ListItemButton>
                </ListItem>
                ))}
            </List>

        </>
    )
}