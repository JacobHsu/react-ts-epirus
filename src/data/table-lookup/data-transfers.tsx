import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { CellTime } from 'components/table-content/desktop/table/table-data-row/cell-time';
import { CellValue } from 'components/table-content/desktop/table/table-data-row/cell-value';
import { IHeaderDictionary, IHeaderItem } from 'models/models-data-general';
import { EHeaderIconType } from 'models/models-table-general';
import {
  ETransfersHeaderType,
  ETransfersSortAndFilterType,
  ITransfersData,
} from 'models/models-table-transfers';
import { formatHash } from 'utils/format';
import { getOptimalLink, toNextLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

const TRANSFERS_HEADER_ITEMS: IHeaderItem[] = [
  {
    headerType: ETransfersHeaderType.Hash,
    headerIconType: null,
  },
  {
    headerType: ETransfersHeaderType.From,
    headerIconType: null,
  },
  {
    headerType: ETransfersHeaderType.To,
    headerIconType: null,
  },
  {
    headerType: ETransfersHeaderType.Time,
    headerIconType: EHeaderIconType.Sort,
    type: ETransfersSortAndFilterType.timestampISO,
  },
];

export const TRANSFERS_HEADER_ITEMS_ERC20: IHeaderItem[] = [
  TRANSFERS_HEADER_ITEMS[0],
  {
    headerType: ETransfersHeaderType.Quantity,
    headerIconType: null,
  },
  ...TRANSFERS_HEADER_ITEMS.slice(1),
];

export const TRANSFERS_HEADER_ITEMS_ERC721: IHeaderItem[] = [
  TRANSFERS_HEADER_ITEMS[0],
  {
    headerType: ETransfersHeaderType.TokenId,
    headerIconType: null,
  },
  ...TRANSFERS_HEADER_ITEMS.slice(1),
];

export const TRANSFERS_CELL_LOOKUP: IHeaderDictionary<(data: ITransfersData) => JSX.Element> = {
  [ETransfersHeaderType.Hash]: (data: ITransfersData) => (
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
  [ETransfersHeaderType.Quantity]: (data: ITransfersData) => (
    <CellValue contentToCopy={data.quantity}>{data.quantity}</CellValue>
  ),
  [ETransfersHeaderType.TokenId]: (data: ITransfersData) => (
    <CellValue contentToCopy={data.tokenId}>{data.tokenId}</CellValue>
  ),
  [ETransfersHeaderType.From]: (data: ITransfersData) => {
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
  [ETransfersHeaderType.To]: (data: ITransfersData) => {
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
  [ETransfersHeaderType.Time]: (data: ITransfersData) => <CellTime>{data.timestampISO}</CellTime>,
};
