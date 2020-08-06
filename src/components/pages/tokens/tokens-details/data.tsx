import React from 'react';

import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { IDetailsHighlightProps } from 'models/models-details-general';
import { ITokenDetailsFetch } from 'models/models-details-tokens';
import { ETagType } from 'models/models-tags';
import { formatHash, formatWithCommas } from 'utils/format';
import { resolveTokenName, tokenDetailsTagLookup } from 'utils/tokens';
import { defined } from 'utils/variable-evaluation';

export function tokenOverviewConfig(tokenDetails: ITokenDetailsFetch) {
  const { address, contractType, decimals, symbol } = tokenDetails;

  let infoSecondLine = [
    {
      name: 'Symbol',
      value: defined(symbol) ? symbol : 'Unknown',
    },
  ];

  if (contractType !== ETagType.ERC721) {
    infoSecondLine = [
      ...infoSecondLine,
      {
        name: 'Decimals',
        value: defined(decimals) ? decimals.toString() : 'Unknown',
      },
    ];
  }

  return {
    titleConfig: {
      label: 'Token Details',
      tag: tokenDetailsTagLookup(contractType),
    },
    subtitleConfig: {
      value: resolveTokenName(tokenDetails),
      label: resolveTokenName(tokenDetails),
      isNoCopyIcon: true,
      isNoRenameIcon: true,
    },
    info: [
      [
        {
          name: 'Contract Address',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={address}
              linkConfig={{
                href: `/contracts/[detailsHash]`,
                as: `/contracts/${address}`,
              }}
            >
              {formatHash(address)}
            </ToolTipContentInline>
          ),
        },
      ],
      infoSecondLine,
    ],
  };
}

export function tokenHighlightConfig(totalSupply: number): IDetailsHighlightProps {
  let value;

  if (totalSupply === 0) {
    value = 0;
  } else if (defined(totalSupply)) {
    value = formatWithCommas(totalSupply);
  } else {
    value = 'Unknown';
  }

  return {
    style: { height: `calc(230px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Total Supply',
    value,
    tooltipContentToCopy: defined(totalSupply) ? formatWithCommas(totalSupply) : null,
  };
}
