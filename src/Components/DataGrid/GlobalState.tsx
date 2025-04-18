// store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface GlobalState {
    tradeRows: TradeRow[];
    setTradeRows: (tradeRows: TradeRow[]) => void;
    bankTransferRows: BankTransferRow[];
    setBankTransferRows: (bankTransferRows: BankTransferRow[]) => void;
    dividendRows: DividendRow[];
    setDividendRows: (dividendRows: DividendRow[]) => void;
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
        }),
        {
            name: 'trade_rows_data', // 🔑 key used in localStorage
            getStorage: () => localStorage, // optional but explicit
        }
    )
);

export const fetchTradeResults = async (tradeRows: any[]) => {
    const response = await fetch(
        'http://localhost:8000/dashboard/overall_performance/get_results?format=json',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tradeRows),
        }
    );

    if (!response.ok) throw new Error('Failed to fetch performance data');

    return response.json();
};
