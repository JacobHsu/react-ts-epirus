import moment from 'moment';

import { IPaging } from './models-data-general';
import { ILinkItem } from './models-general';
import { IFunctionMeta } from './models-table-function';
import { ETagType } from './models-tags';

export enum ETransactionsHeaderType {
  Type = 'Type',
  Hash = 'Hash',
  Function = 'Function',
  From = 'From',
  To = 'To',
  Value = 'Value',
  Time = 'Time',
}

export interface ITransactionsData {
  direction: ETransactionsDirection;
  timestamp: number;
  hash: string;
  from: string;
  to: string;
  value: string;
  timestampISO: string;
  transactionType: ETagType;
  functionMeta: IFunctionMeta;
  private: boolean;
  ethValue: string;
  detailsHash?: string;
  fromLinks: ILinkItem[];
  toLinks: ILinkItem[];
}

export interface ITransactionsTableFetch {
  paging: IPaging;
  data: ITransactionsData[];
}

export enum ETransactionsSortAndFilterType {
  blockNumber = 'blockNumber',
  created = 'created',
  lastExecuted = 'lastExecuted',
  timestampISO = 'timestampISO',
  from = 'from',
  to = 'to',
  blockHash = 'blockHash',
  transactionType = 'transactionType',
  functionName = 'functionName',
  ethValue = 'ethValue',
  direction = 'direction',
}

export enum ETransactionsTransactionType {
  ContractCall = 'Contract Call',
  Transfer = 'Transfer',
  ContractCreation = 'Contract Creation',
}

export enum ETransactionsDirection {
  In = 'In',
  Out = 'Out',
  Self = 'Self',
}

export interface ETransactionsMultiFilterType {
  lastExecuted: moment.Moment[];
  contractType: string[];
}
