export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
  }
  
export interface TransactionWallet {
  _id?: number;
  name: string;
  amount: number;
  type: string;
  transaction_hash: string;
  phone_number: number;
  txn_status: string;
  wallet_id: string;
  order_number: string;
}  