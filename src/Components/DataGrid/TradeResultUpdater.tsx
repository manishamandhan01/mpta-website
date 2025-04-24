import { useEffect } from 'react';
import {useTradeResults, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

const TradeResultsUpdater = () => {
    const tradeRows = useGlobalStore((state) => state.tradeRows);
    const bankTransferRows = useGlobalStore((state) => state.bankTransferRows);
    const dividendRows = useGlobalStore((state) => state.dividendRows);
    const { fetchTradeResults } = useTradeResults();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // You can combine all three arrays or just use tradeRows depending on your API
                const combinedData = {
                    tradeRows: tradeRows,
                    bankTransferRows: bankTransferRows,
                    dividendRows: dividendRows,
                };

                const result = await fetchTradeResults();
                console.log('Fetched performance data:', result);
                // Optionally update state with the result here
            } catch (error) {
                console.error('Error fetching trade results:', error);
            }
        };

        fetchData();
    }, [tradeRows, bankTransferRows, dividendRows]); // triggers when any of these change

    return null; // This component is just for side effects
};

export default TradeResultsUpdater;