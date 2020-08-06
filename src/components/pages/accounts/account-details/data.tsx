import React from 'react';

import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { IAccountDetailsFetch } from 'models/models-details-accounts';
import { IDetailsHighlightProps } from 'models/models-details-general';
import { themed } from 'theming';
import { formatHash, formatWithCommas } from 'utils/format';

const currency = themed('currency');

export function accountOverviewConfig(
  { address, balance, display, ethBalance }: IAccountDetailsFetch,
  isDesktop,
) {
  return {
    titleConfig: {
      label: 'Account Details',
    },
    subtitleConfig: {
      value: address,
      label: isDesktop ? address.toString() : formatHash(address),
      display: display,
    },
    additionalDetails: [
      [
        {
          name: 'Balance',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 12 }}
              contentToCopy={`${formatWithCommas(balance, 0, 0)} ${themed('smallCurrency')}`}
            >
              {`${formatWithCommas(ethBalance)} ${currency}`}
            </ToolTipContentInline>
          ),
        },
      ],
    ],
  };
}

export function accountHighlightConfig(ethBalance): IDetailsHighlightProps {
  return {
    style: { height: `calc(222px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Balance',
    value: formatWithCommas(parseFloat(ethBalance)),
    unit: currency,
    tooltipContentToCopy: `${formatWithCommas(parseFloat(ethBalance))} ${currency}`,
  };
}
