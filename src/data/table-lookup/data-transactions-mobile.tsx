import React from 'react';

import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { InlineTime } from 'components/table-content/mobile/table/table-mobile-item/inline-time';
import { InlineValue } from 'components/table-content/mobile/table/table-mobile-item/inline-value';
import { TypeTag } from 'components/type-tags';
import { IHeaderDictionary } from 'models/models-data-general';
import { ETransactionsHeaderType, ITransactionsData } from 'models/models-table-transactions';
import { ETagType } from 'models/models-tags';
import { themed } from 'theming';
import { formatHash, formatWithCommas } from 'utils/format';
import { getOptimalLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

import { renderFunctionInline } from './helpers';

export const TRANSACTIONS_MOBILE_CELL_LOOKUP: IHeaderDictionary<(
  data: ITransactionsData,
) => JSX.Element> = {
  [ETransactionsHeaderType.Type]: (data: ITransactionsData) => (
    <TypeTag isPrivate={data.private} tagType={ETagType[data.transactionType]} />
  ),
  [ETransactionsHeaderType.Function]: renderFunctionInline,
  [ETransactionsHeaderType.Hash]: (data: ITransactionsData) => (
    <InlineHash
      contentToCopy={data.hash}
      linkConfig={{
        href: `/transactions/[detailsHash]`,
        as: `/transactions/${data.hash}`,
        style: {
          fontSize: 16,
          lineHeight: '20px',
        },
      }}
    >
      {formatHash(data.hash)}
    </InlineHash>
  ),
  [ETransactionsHeaderType.From]: (data: ITransactionsData) => {
    const fromLink = getOptimalLink(['token', 'contract', 'account'], data.fromLinks);
    return (
      <InlineHash
        contentToCopy={fromLink.display}
        linkConfig={{
          ...fromLink.nextLinkConfig,
          style: {
            fontSize: 14,
            lineHeight: '20px',
          },
        }}
      >
        {isHash(fromLink.display) ? formatHash(fromLink.display) : fromLink.display}
      </InlineHash>
    );
  },
  [ETransactionsHeaderType.To]: (data: ITransactionsData) => {
    const toLink = getOptimalLink(['token', 'contract', 'account'], data.toLinks);
    return (
      <InlineHash
        style={{
          fontSize: 14,
          lineHeight: '20px',
        }}
        contentToCopy={toLink.display}
        linkConfig={{ ...toLink.nextLinkConfig }}
      >
        {isHash(toLink.display) ? formatHash(toLink.display) : toLink.display}
      </InlineHash>
    );
  },
  [ETransactionsHeaderType.Value]: (data: ITransactionsData) => (
    <InlineValue
      style={{
        fontSize: 14,
        lineHeight: '20px',
      }}
      contentToCopy={`${formatWithCommas(parseFloat(data.value), 0, 0)} ${themed('smallCurrency')}`}
      unit={themed('currency')}
    >
      {formatWithCommas(parseFloat(data.ethValue))}
    </InlineValue>
  ),
  [ETransactionsHeaderType.Time]: (data: ITransactionsData) => (
    <InlineTime>{data.timestampISO}</InlineTime>
  ),
};
