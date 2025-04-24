// store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {useState} from "react";

export type TradeRow = {
    id: number;
    date: string;
    ticker: string;
    action: string;
    price: number;
    volume: number;
    over_write_fees: number;
    fees: number;
    netAmount: number;
    avePrice: number;
    profit: number;
    percentProfit: string;
    days: number;
    rmul: string;
    equity: number;
    setup: string;
    reason: string;
    notes: string;
};

export type BankTransferRow = {
    id: number;
    date: string;
    action: string;
    grossAmount: number;
    fees: number;
    netAmount: number;
    notes: string;
}

export type DividendRow = {
    id: number;
    symbol: string;
    dividendType: string;
    dateReceived: string;
    amountReceived: number;
}
export type BackendResult = {
    id: number;
    symbol: string;
    dividendType: string;
    dateReceived: string;
    amountReceived: number;
}

interface GlobalState {
    tradeRows: TradeRow[];
    setTradeRows: (tradeRows: TradeRow[]) => void;
    bankTransferRows: BankTransferRow[];
    setBankTransferRows: (bankTransferRows: BankTransferRow[]) => void;
    dividendRows: DividendRow[];
    setDividendRows: (dividendRows: DividendRow[]) => void;
    backendResult: BackendResult[];
    setBackendResult: (backendResult: BackendResult[]) => void;

}

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            tradeRows: [],
            setTradeRows: (tradeRows) => set({ tradeRows }),
            bankTransferRows: [],
            setBankTransferRows: (bankTransferRows) => set({ bankTransferRows }),
            dividendRows: [],
            setDividendRows: (dividendRows) => set({ dividendRows }),
            backendResult: [],
            setBackendResult: (backendResult) => set({ backendResult }),
        }),
        {
            name: 'trade_rows_data', // 🔑 key used in localStorage
            getStorage: () => localStorage, // optional but explicit
        }
    )
);

export type CombinedRows = {
    tradeRows: TradeRow[];
    bankTransferRows: BankTransferRow[];
    dividendRows: DividendRow[];
}

export const useTradeResults = () => {
    const { tradeRows, bankTransferRows, dividendRows } = useGlobalStore();
    const [backendResult, setBackendResult] = useState<BackendResult[]>([]);

    const fetchTradeResults = async () => {
        const combinedData = {
            trade_rows: tradeRows,
            bank_transfer_rows: bankTransferRows,
            dividend_rows: dividendRows,
        };

        const response = await fetch(
            'http://localhost:8000/dashboard/overall_performance/get_results?format=json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(combinedData),
            }
        );

        if (!response.ok) throw new Error('Failed to fetch performance data');
        const data = await response.json();
        setBackendResult(data);
        return data;
    };

    return { backendResult, fetchTradeResults };
};

