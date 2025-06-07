// store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {useState} from "react";

type SetupSetting = {
    setup: string;
    definition: string;
};

type NoteDefault = {
    reason: string;
};

type EvaluationSetting = {
    entryExit: string;
    score1: number;
    emotion: string;
    score2: number;
};

export type TradingSetting = {
    name: string;
    interval: string;
    yAxisGap: string;
    noOfTrades: number;
    currencySymbol: string;
    retainFormula: number;
    rowsToAdd: number;
    winLossCount: number;
    reportDate: string;
    setupSettings: SetupSetting[];
    noteDefaults: NoteDefault[];
    evaluationSettings: EvaluationSetting[];
};

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
    finalTradeRows: TradeRow[];
    setFinalTradeRows: (tradeRows: TradeRow[]) => void;
    bankTransferRows: BankTransferRow[];
    setBankTransferRows: (bankTransferRows: BankTransferRow[]) => void;
    dividendRows: DividendRow[];
    setDividendRows: (dividendRows: DividendRow[]) => void;
    backendResult: BackendResult[];
    setBackendResult: (backendResult: BackendResult[]) => void;
    tradingSetting: TradingSetting;
    setTradingSetting: (tradingSetting: TradingSetting) => void;

}

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            tradeRows: [],
            setTradeRows: (tradeRows) => set({ tradeRows }),
            finalTradeRows: [],
            setFinalTradeRows: (finalTradeRows) => set({ finalTradeRows }),
            bankTransferRows: [],
            setBankTransferRows: (bankTransferRows) => set({ bankTransferRows }),
            dividendRows: [],
            setDividendRows: (dividendRows) => set({ dividendRows }),
            backendResult: [],
            setBackendResult: (backendResult) => set({ backendResult }),
            tradingSetting: {
                name: "Sam",
                interval: "2%",
                yAxisGap: "0%",
                noOfTrades: 100,
                currencySymbol: "Php",
                retainFormula: 20,
                rowsToAdd: 100,
                winLossCount: 50,
                reportDate: "Last Trade Data",
                setupSettings: [
                    { setup: "Momentum", definition: "" },
                    { setup: "Bounce", definition: "" },
                    { setup: "Trend Follow", definition: "" },
                    { setup: "Swing Trade", definition: "" },
                    { setup: "Bottom fishing", definition: "" }
                ],
                noteDefaults: [
                    { reason: "Time-stop" },
                    { reason: "Breakout entry Hit" },
                    { reason: "BO+Volume+RSI" },
                    { reason: "Tranche Buy" },
                    { reason: "Lock in Profit" }
                ],
                evaluationSettings: [
                    { entryExit: "TOO EARLY", score1: -1, emotion: "FEAR", score2: -1 },
                    { entryExit: "TOO LATE", score1: -1, emotion: "HOPE", score2: -1 },
                    { entryExit: "NOT IN PLAN", score1: -1, emotion: "GREED", score2: -1 },
                    { entryExit: "AS PLANNED", score1: 1, emotion: "BORED", score2: 1 },
                    { entryExit: "BROKE RULES", score1: -1, emotion: "IMPULSE", score2: -1 },
                    { entryExit: "NEWS", score1: -1, emotion: "FOMO", score2: -1 },
                    { entryExit: "FUNDA", score1: 1, emotion: "CONFIDENT", score2: 1 }
                ]
            },
            setTradingSetting: (tradingSetting) => set({ tradingSetting }),
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
    tradingSetting: TradingSetting;
}

export const useTradeResults = () => {
    const { tradeRows, bankTransferRows, dividendRows, tradingSetting} = useGlobalStore();
    const [backendResult, setBackendResult] = useState<BackendResult[]>([]);

    const fetchTradeResults = async () => {
        const combinedData = {
            trade_rows: tradeRows,
            bank_transfer_rows: bankTransferRows,
            dividend_rows: dividendRows,
            trading_setting: tradingSetting,
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

