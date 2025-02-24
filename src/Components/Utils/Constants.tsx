import {PositionCalculatorResultModel} from "../Models/PositionCalculatorResultModel.tsx";
import {RBCalculatorResultModel} from "@Components/Models/RBCalculatorResultModel.tsx";

export const CPSModel =
    {
        riskTier: 0.50,
        entryPrice: 200,
        stopPrice: 95,
        targetPrice: 120,
        ticker: 'MCFT',
        accountBalance: 100000,
    }
export const CRBModel =
    {
        portfolioSize: 100000,
        positionSize: 25,
        desiredReturn: 30,
        averageGain: 13,
        averageLoss: 8,
        winningTrades: 50,
        numberOfTrades: 100,
        biggestLosing: 15 ,
    }
export const CPSResultModel: PositionCalculatorResultModel[] = [{
    name: '',
    dollarValue: 0,
    percentValue: 0,
    ticker: ''
}
]
export const CRBResultModel: RBCalculatorResultModel[] = [{
    name: '',
    dollarValue: 0,
    percentValue: 0,
}
]

export type QuarterlyPnl ={
    [key:string] :number;
}

export type PerformancePeriod = {
    quarterly_pnl: QuarterlyPnl;
    year_to_date_pnl: number;
    previous_year_to_date_pnl: number;
    this_month_pnl: number;
};






