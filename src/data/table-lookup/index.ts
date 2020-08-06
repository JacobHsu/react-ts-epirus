import { IHeaderDictionary } from 'models/models-data-general';
import { EPageType, IDictionary } from 'models/models-general';

import { BLOCKS_CELL_LOOKUP } from './data-blocks';
import { BLOCKS_MOBILE_CELL_LOOKUP } from './data-blocks-mobile';
import { CONTRACTS_CELL_LOOKUP } from './data-contracts';
import { CONTRACTS_MOBILE_CELL_LOOKUP } from './data-contracts-mobile';
import { EVENTS_CELL_LOOKUP } from './data-events';
import { EVENTS_CONTRACTS_CELL_LOOKUP } from './data-events-contracts';
import { EVENTS_CONTRACTS_MOBILE_CELL_LOOKUP } from './data-events-contracts-mobile';
import { EVENTS_MOBILE_CELL_LOOKUP } from './data-events-mobile';
import { EVENTS_TRANSACTIONS_CELL_LOOKUP } from './data-events-transactions';
import { EVENTS_TRANSACTIONS_MOBILE_CELL_LOOKUP } from './data-events-transactions-mobile';
import { FUNCTION_TRANSACTIONS_CELL_LOOKUP } from './data-function-transactions';
import { FUNCTION_TRANSACTIONS_MOBILE_CELL_LOOKUP } from './data-function-transactions-mobile';
import { METADATA_CELL_LOOKUP } from './data-metadata';
import { METADATA_MOBILE_CELL_LOOKUP } from './data-metadata-mobile';
import { NODE_PEERS_CELL_LOOKUP } from './data-node-peers';
import { NODE_PEERS_MOBILE_CELL_LOOKUP } from './data-node-peers-mobile';
import { TOKENS_CELL_LOOKUP } from './data-tokens';
import { TOKENS_MOBILE_CELL_LOOKUP } from './data-tokens-mobile';
import { TRANSACTIONS_CELL_LOOKUP } from './data-transactions';
import { TRANSACTIONS_MOBILE_CELL_LOOKUP } from './data-transactions-mobile';
import { TRANSFERS_CELL_LOOKUP } from './data-transfers';
import { TRANSFERS_MOBILE_CELL_LOOKUP } from './data-transfers-mobile';

export const COMBINED_LOOKUP: IDictionary<IHeaderDictionary<(data: any) => JSX.Element>> = {
  [EPageType.metadata]: METADATA_CELL_LOOKUP,
  [EPageType.metadataMobile]: METADATA_MOBILE_CELL_LOOKUP,
  [EPageType.contracts]: CONTRACTS_CELL_LOOKUP,
  [EPageType.contractsMobile]: CONTRACTS_MOBILE_CELL_LOOKUP,
  [EPageType.contractsMostActive]: CONTRACTS_CELL_LOOKUP,
  [EPageType.contractsMobileMostActive]: CONTRACTS_MOBILE_CELL_LOOKUP,
  [EPageType.events]: EVENTS_CELL_LOOKUP,
  [EPageType.eventsMobile]: EVENTS_MOBILE_CELL_LOOKUP,
  [EPageType.tokens]: TOKENS_CELL_LOOKUP,
  [EPageType.tokensMobile]: TOKENS_MOBILE_CELL_LOOKUP,
  [EPageType.transactions]: TRANSACTIONS_CELL_LOOKUP,
  [EPageType.transactionsMobile]: TRANSACTIONS_MOBILE_CELL_LOOKUP,
  [EPageType.transfers]: TRANSFERS_CELL_LOOKUP,
  [EPageType.transfersMobile]: TRANSFERS_MOBILE_CELL_LOOKUP,
  [EPageType.blocks]: BLOCKS_CELL_LOOKUP,
  [EPageType.blocksMobile]: BLOCKS_MOBILE_CELL_LOOKUP,
  [EPageType.eventsContracts]: EVENTS_CONTRACTS_CELL_LOOKUP,
  [EPageType.eventsContractsMobile]: EVENTS_CONTRACTS_MOBILE_CELL_LOOKUP,
  [EPageType.eventsTransactions]: EVENTS_TRANSACTIONS_CELL_LOOKUP,
  [EPageType.eventsTransactionsMobile]: EVENTS_TRANSACTIONS_MOBILE_CELL_LOOKUP,
  [EPageType.functionTransactions]: FUNCTION_TRANSACTIONS_CELL_LOOKUP,
  [EPageType.functionTransactionsMobile]: FUNCTION_TRANSACTIONS_MOBILE_CELL_LOOKUP,
  [EPageType.nodePeers]: NODE_PEERS_CELL_LOOKUP,
  [EPageType.nodePeersMobile]: NODE_PEERS_MOBILE_CELL_LOOKUP,
};

export const TYPE_LOOKUP = {
  // always end with "s", will be removed if only one element
  metadata: 'results',
  metadataMobile: 'results',
  contracts: 'contracts',
  contractsMobile: 'contracts',
  contractsMostActive: 'contractsMostActive',
  contractsMobileMostActive: 'contractsMobileMostActive',
  tokens: 'tokens',
  tokensMobile: 'tokens',
  events: 'events',
  eventsMobile: 'events',
  transactions: 'transactions',
  transactionsMobile: 'transactions',
  transfers: 'transfers',
  transfersMobile: 'transfers',
  blocks: 'blocks',
  blocksMobile: 'blocks',
  eventsContracts: 'events',
  eventsContractsMobile: 'events',
  eventsTransactions: 'events',
  eventsTransactionsMobile: 'events',
  functionTransactions: 'functions',
  functionTransactionsMobile: 'functions',
  nodePeers: 'peers',
  nodePeersMobile: 'peers',
};
