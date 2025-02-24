export interface BankTransferModel {
    date: string;
    action: string;
    grossAmount: string;
    fees: string;
    netAmount: string;
    notes?: string;
}