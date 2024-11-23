import {PositionCalculatorResultModel} from "../Models/PositionCalculatorResultModel.tsx";

export const CPSModel =
    {
        riskTier: 0,
        entryPrice: 0,
        stopPrice: 0,
        targetPrice: 0,
        ticker: '',
        accountBalance: 0,
    }
export const CRBModel =
    {
        portfolioSize: 0,
        positionSize: 0,
        desiredReturn: 0,
        averageGain: 0,
        averageLoss: 0,
        winningTrades: 0,
        numberOfTrades: 0,
    }
export const CPSResultModel: PositionCalculatorResultModel[] = [{
    name: '',
    dollarValue: 0,
    percentValue: 0,
    ticker: ''
}
]


