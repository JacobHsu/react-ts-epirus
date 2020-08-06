import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { CellTime } from 'components/table-content/desktop/table/table-data-row/cell-time';
import { CellValue } from 'components/table-content/desktop/table/table-data-row/cell-value';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { EHeaderIconType } from 'models/models-table-general';
import {
  ETransactionsHeaderType,
  ETransactionsSortAndFilterType,
  ETransactionsTransactionType,
  ITransactionsData,
} from 'models/models-table-transactions';
import { ETagType } from 'models/models-tags';
import { themed } from 'theming';
import { formatHash, formatWithCommas } from 'utils/format';
import { getOptimalLink, toNextLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

import { renderFunctionCell } from './helpers';

const currency = themed('currency');

export const TRANSACTIONS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: ETransactionsHeaderType.Type,
    headerIconType: EHeaderIconType.CheckboxFilter,
    type: ETransactionsSortAndFilterType.transactionType,
    options: Object.keys(ETransactionsTransactionType).map(
      (type: string) => ETransactionsTransactionType[type],
    ),
    fixedWidth: 173,
  },
  {
    headerType: ETransactionsHeaderType.Function,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.Hash,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.From,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.To,
    headerIconType: null,
  },
  {
    headerType: ETransactionsHeaderType.Value,
    headerIconType: EHeaderIconType.Sort,
    type: ETransactionsSortAndFilterType.ethValue,
  },
  {
    headerType: ETransactionsHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: ETransactionsSortAndFilterType.timestampISO,
  },
];

export const TRANSACTIONS_ACCOUNT_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_HEADER_ITEMS;
export const TRANSACTIONS_CONTRACT_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_HEADER_ITEMS;
export const TRANSACTIONS_TOKENS_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_HEADER_ITEMS;

const TRANSACTIONS_NESTED_HEADER_ITEMS: IHeaderItem[] = [
  ...TRANSACTIONS_HEADER_ITEMS.slice(0, TRANSACTIONS_HEADER_ITEMS.length - 1),
];

export const TRANSACTIONS_BLOCK_HEADER_ITEMS: IHeaderItem[] = TRANSACTIONS_NESTED_HEADER_ITEMS;

export const TRANSACTIONS_CELL_LOOKUP: IHeaderDictionary<(
  data: ITransactionsData,
) => JSX.Element> = {
  [ETransactionsHeaderType.Type]: (data: ITransactionsData) => (
    <TypeTag isPrivate={data.private} tagType={ETagType[data.transactionType]} />
  ),
  [ETransactionsHeaderType.Function]: renderFunctionCell,
  [ETransactionsHeaderType.Hash]: (data: ITransactionsData) => (
    <CellHash
      contentToCopy={data.hash}
      linkConfig={{
        href: `/transactions/[detailsHash]`,
        as: `/transactions/${data.hash}`,
      }}
    >
      {formatHash(data.hash)}
    </CellHash>
  ),
  [ETransactionsHeaderType.From]: (data: ITransactionsData) => {
    const linkToDisplay = getOptimalLink(['token', 'contract', 'account'], data.fromLinks);
    return (
      <CellHash
        contentToCopy={linkToDisplay.display}
        allLinks={data.fromLinks.map(toNextLink)}
        linkConfig={{ ...linkToDisplay.nextLinkConfig }}
      >
        {isHash(linkToDisplay.display) ? formatHash(linkToDisplay.display) : linkToDisplay.display}
      </CellHash>
    );
  },
  [ETransactionsHeaderType.To]: (data: ITransactionsData) => {
    const linkToDisplay = getOptimalLink(['token', 'contract', 'account'], data.toLinks);
    return (
      <CellHash
        contentToCopy={linkToDisplay.display}
        allLinks={data.toLinks.map(toNextLink)}
        linkConfig={{ ...linkToDisplay.nextLinkConfig }}
      >
        {isHash(linkToDisplay.display) ? formatHash(linkToDisplay.display) : linkToDisplay.display}
      </CellHash>
    );
  },
  [ETransactionsHeaderType.Value]: (data: ITransactionsData) => (
    <CellValue
      contentToCopy={`${formatWithCommas(parseFloat(data.ethValue))} ${currency}`}
      unit={currency}
    >
      {formatWithCommas(parseFloat(data.ethValue))}
    </CellValue>
  ),
  [ETransactionsHeaderType.Time]: (data: ITransactionsData) => (
    <CellTime>{data.timestampISO}</CellTime>
  ),
};
