import { CSSProperties } from 'react';

import { IDictionary } from './models-general';
import {
  EBlocksHeaderType,
  EBlocksSortAndFilterType,
  IBlocksTableFetch,
} from './models-table-blocks';
import {
  EContractsHeaderType,
  EContractsSortAndFilterType,
  IContractsTableFetch,
} from './models-table-contracts';
import {
  EEventsHeaderType,
  EEventsSortAndFilterType,
  IEventsTableFetch,
} from './models-table-events';
import { EFunctionHeaderType, IFunctionTableFetch } from './models-table-function';
import {
  EHeaderIconType,
  IFilterValue,
  IPageNumberValues,
  IRowsDisplayedValues,
  ISortValues,
} from './models-table-general';
import { EMetadataHeaderType, EMetadataSortAndFilterType } from './models-table-metadata';
import { ENodePeersHeaderType, IPeersTableFetch } from './models-table-peers';
import {
  ETokensHeaderType,
  ETokensSortAndFilterType,
  ITokensTableFetch,
} from './models-table-tokens';
import {
  ETransactionsHeaderType,
  ETransactionsSortAndFilterType,
  ITransactionsTableFetch,
} from './models-table-transactions';
import {
  ETransfersHeaderType,
  ETransfersSortAndFilterType,
  ITransfersTableFetch,
} from './models-table-transfers';

export enum EDirectionType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type THeaderType =
  | EContractsHeaderType
  | ETokensHeaderType
  | ETransactionsHeaderType
  | ETransfersHeaderType
  | EBlocksHeaderType
  | EEventsHeaderType
  | EMetadataHeaderType
  | EFunctionHeaderType
  | ENodePeersHeaderType;
export type TSortAndFilterType =
  | EContractsSortAndFilterType
  | ETokensSortAndFilterType
  | ETransactionsSortAndFilterType
  | ETransfersSortAndFilterType
  | EBlocksSortAndFilterType
  | EEventsSortAndFilterType
  | EMetadataSortAndFilterType;
export type IFetchParamsValues = IPageNumberValues &
  ISortValues &
  IRowsDisplayedValues &
  IFilterValue;

export interface IHeaderItem {
  headerType: THeaderType;
  headerIconType?: EHeaderIconType;
  type?: TSortAndFilterType;
  options?: any[];
  optionsLabelLookup?: IDictionary<string>;
  fixedWidth?: number;
}

export interface IHeaderDictionary<T> {
  [key: string]: T;
}

export enum EDisplayTitleType {
  Normal = 'Normal',
  Tab = 'Tab',
}

export type TTableFetch =
  | IFunctionTableFetch
  | IContractsTableFetch
  | ITokensTableFetch
  | IBlocksTableFetch
  | ITransactionsTableFetch
  | ITransfersTableFetch
  | IEventsTableFetch
  | IPeersTableFetch;

export interface IPaging {
  page?: number;
  size?: number;
  sort?: TSortAndFilterType;
  direction?: EDirectionType;
  totalElements: number;
  totalPages?: number;
  filter?: string;
}

export interface IFetchConfig {
  apiLink: string;
  pathname: string;
  params: { [key: string]: string | string[] };
}

export interface IHashLinkConfig {
  rootUrl: string;
  hash: string;
}

export interface ILinkConfig {
  href: string;
  as?: string;
  style?: CSSProperties;
}

export interface IError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export enum ESyncStatus {
  DOWN = 'Down',
  SYNCING = 'Syncing',
  UP = 'Synced',
}

export interface ISyncStatusComponent {
  status: ESyncStatus;
  details?: IDictionary<string>;
}

export interface ISyncStatusComponents {
  mongo: ISyncStatusComponent;
  node: ISyncStatusComponent;
  ping: ISyncStatusComponent;
}

export interface ISyncStatus {
  components?: ISyncStatusComponents;
  status: ESyncStatus;
}
