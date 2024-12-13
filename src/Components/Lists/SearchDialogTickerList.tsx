import React from "react";
import {TickersListModel} from "@Components/Models/TickersListModel.tsx";
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar';


interface IProps {
    tickersList: TickersListModel[] | undefined;
    onSelectTicker: (ticker: TickersListModel) => void;
}

export const SearchDialogTickerList: React.FC<IProps> = ({tickersList, onSelectTicker}) => {
    if (!tickersList || tickersList.length === 0) {
        return <div>No tickers available</div>; // Display a message if tickers are undefined or empty
    } else


        return (
            <>

                <List>
                    {tickersList.map((ticker) => (
                        <ListItem key={ticker.ticker} >
                            <ListItemButton onClick={() => onSelectTicker(ticker)}
                                            className="d-flex justify-content-between">

                                <ListItemAvatar>
                                    <div className="markedFlagWrap-oRSs8UQo"><span className="container-hEv0no2M"><div
                                        className="uiMarker-erqqoDve markedFlag-oRSs8UQo"><svg
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12" width="14" height="12"
                                        fill="currentColor" focusable="false" preserveAspectRatio="none"><path
                                        d="M14 12l-4-6 4-6H0v12z"></path></svg></div></span></div>
                                    <Avatar className="ms-3"
                                        alt={`Avatar`}
                                        src={"/public/tradebar.jpg"}
                                    />
                                </ListItemAvatar>
                                <ListItemDecorator style={{textAlign: 'center'}}>
                                    {ticker.name ? ticker.name : 'Unknown Name'}
                                </ListItemDecorator>
                                <ListItemContent className="listItemContent">
                                    {ticker.ticker ? ticker.ticker : 'Unknown Ticker'}
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </>
        )
}