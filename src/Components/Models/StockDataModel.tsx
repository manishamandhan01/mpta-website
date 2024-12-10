
export interface StockDataModel {
    open?: number;
    high?: number;
    low?: number;
    close?: number;
    volume?: number;
    date?: string;
    adj_high?: number,
    adj_low?: number,
    adj_close?: number,
    adj_open?: number,
    adj_volume?: number,
    split_factor?: number,
    dividend?: number,
    symbol?: string,
    exchange?: string,
}
