import React from 'react';

import { TextViewerWrapper } from 'components/inputs/text-viewer-modal';
import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { IDetailsHighlightProps, IOverviewContentProps } from 'models/models-details-general';
import { ETagType } from 'models/models-tags';
import { themed } from 'theming';
import { formatDateDiffFromNow, formatHash, formatHashLong, formatWithCommas } from 'utils/format';
import { getOptimalLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

const currency = themed('currency');

export function transactionOverviewConfig(data, isDesktop: boolean): IOverviewContentProps {
  const {
    blockHash,
    blockNumber,
    cumulativeGasUsed,
    ethValue,
    from,
    fromLinks,
    gas,
    gasPrice,
    gasUsed,
    hash,
    input,
    nonce,
    status,
    timestampISO,
    to,
    toLinks,
    transactionIndex,
    transactionType,
    value,
  } = data;

  const fromToDisplay = getOptimalLink(['token', 'contract', 'account'], fromLinks);
  const toToDisplay = getOptimalLink(['token', 'contract', 'account'], toLinks);

  return {
    titleConfig: {
      label: 'Transaction Details',
      tag: ETagType[transactionType],
    },
    subtitleConfig: {
      value: hash,
      label: isDesktop ? formatHashLong(hash) : formatHash(hash),
      isNoRenameIcon: true,
      copyText: 'Copy transaction hash',
    },
    info: [
      [
        {
          name: 'From',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={from}
              linkConfig={{
                ...fromToDisplay.nextLinkConfig,
              }}
            >
              {isHash(fromToDisplay.display)
                ? formatHash(fromToDisplay.display)
                : fromToDisplay.display}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'To',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={to}
              linkConfig={{
                ...toToDisplay.nextLinkConfig,
              }}
            >
              {isHash(toToDisplay.display) ? formatHash(toToDisplay.display) : toToDisplay.display}
            </ToolTipContentInline>
          ),
        },
      ],
      [
        {
          name: 'Status',
          value: status,
        },
        {
          name: 'Time',
          value: formatDateDiffFromNow(timestampISO),
        },
      ],
    ],
    additionalDetails: [
      [
        {
          name: 'Input Bytecode',
          value: <TextViewerWrapper title="Input Bytecode">{input}</TextViewerWrapper>,
        },
        {
          name: 'Block',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 12 }}
              contentToCopy={blockNumber.toString()}
              linkConfig={{
                href: `/blocks/[detailsHash]`,
                as: `/blocks/${blockHash}`,
              }}
            >
              {`#${blockNumber}`}
            </ToolTipContentInline>
          ),
        },
      ],
      [
        {
          name: 'Transaction Fee',
          value: `${formatWithCommas(cumulativeGasUsed, 0, 0)} ${themed('smallCurrency')}`,
        },
      ],
      [
        {
          name: 'Position',
          value: transactionIndex.toString(),
        },
        {
          name: 'Nonce',
          value: nonce,
        },
      ],
      [
        {
          name: 'Gas Used',
          value: `${formatWithCommas(gasUsed)} (${((gasUsed * 100) / gas).toFixed(2)}%)`,
        },
        {
          name: 'Gas Price',
          value: `${formatWithCommas(gasPrice, 0, 0)} ${themed('smallCurrency')}`,
        },
      ],
      [
        {
          name: 'Value',
          value: `${formatWithCommas(ethValue)} ${currency} / ${formatWithCommas(
            value,
            0,
            0,
          )} ${themed('smallCurrency')}`,
        },
      ],
    ],
  };
}

export function transactionsHighlightConfig(ethValue): IDetailsHighlightProps {
  return {
    style: { height: `calc(298px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Value',
    value: formatWithCommas(parseFloat(ethValue)),
    unit: currency,
    tooltipContentToCopy: `${formatWithCommas(parseFloat(ethValue))} ${currency}`,
  };
}
