import moment from 'moment';

import { IPaging } from './models-data-general';
import { ETagType } from './models-tags';

export enum ETokensHeaderType {
  Type = 'Type',
  Name = 'Name',
  TotalSupply = 'Total Supply',
  TransactionCount = 'Transaction Count',
  LastExecution = 'Last Execution',
}

export interface ITokensData {
  address: string;
  contractType: ETagType;
  decimals: number;
  lastExecutedTimestampISO: string;
  name?: string;
  symbol?: string;
  totalSupply: number;
  transactionCount: number;
}

export interface ITokensTableFetch {
  paging: IPaging;
  data: ITokensData[];
}

export enum ETokensSortAndFilterType {
  lastExecuted = 'lastExecuted',
  transactionCount = 'transactionCount',
  contractType = 'contractType',
}

export enum ETokensContractType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
}

export interface ETokensMultiFilterType {
  lastExecuted: moment.Moment[];
  contractType: string[];
}
