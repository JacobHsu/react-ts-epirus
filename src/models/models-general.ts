import { EIconType } from './models-icons';

export interface IDictionary<T> {
  [key: string]: T;
}

export interface INameIconPair {
  name: string;
  iconType: EIconType;
}

export interface INameValuePair {
  name: string;
  value: string;
}

export interface INameElementValue {
  name: string;
  value: string | JSX.Element;
}

export interface IBasicParameter {
  name: string;
  value: string;
  type: string;
}

export enum EPageType {
  dashboard = 'dashboard',
  contracts = 'contracts',
  contractsMobile = 'contractsMobile',
  contractsMostActive = 'contractsMostActive',
  contractsMobileMostActive = 'contractsMobileMostActive',
  events = 'events',
  eventsMobile = 'eventsMobile',
  tokens = 'tokens',
  tokensMobile = 'tokensMobile',
  transactions = 'transactions',
  transactionsMobile = 'transactionsMobile',
  transfers = 'transfers',
  transfersMobile = 'transfersMobile',
  blocks = 'blocks',
  blocksMobile = 'blocksMobile',
  nodePeers = 'nodePeers',
  nodePeersMobile = 'nodePeersMobile',
  // other
  metadata = 'metadata',
  metadataMobile = 'metadataMobile',
  eventsContracts = 'eventsContracts',
  eventsContractsMobile = 'eventsContractsMobile',
  eventsTransactions = 'eventsTransactions',
  eventsTransactionsMobile = 'eventsTransactionsMobile',
  functionTransactions = 'functionTransactions',
  functionTransactionsMobile = 'functionTransactionsMobile',
}

export interface ILinkItem {
  href: string;
  rel: string;
  display: string;
  nextLinkConfig: INextLinkItem;
}

export interface INextLinkItem {
  href: string;
  as: string;
}

export enum ELinkType {
  Self = 'self',
  Metadata = 'metadata',
}

export interface IHeadMeta {
  title: string;
  description: string;
  url: string;
  logo: string;
  favicon: string | IDictionary<string>;
}
