import Chart, { ChartData, ChartTooltipItem } from 'chart.js';
import { utc } from 'moment';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { CustomChart, EChartType } from 'components/charts';
import { GRID_LINE_COLOR, GRID_NUMBER_COLOR, TOOLTIP_STYLE_CONFIG } from 'data/data-style';
import { ITransactionCountChartData, ITransactionCountFetchData } from 'models/models-dashboard';
import { transformTimeFilterToString } from 'utils/api/queries-format';
import { roundUpToNearestAllZeros } from 'utils/charts';
import { formatIntegersWithComma, formatWithCommas } from 'utils/format';

export interface ITransactionCountChartProps {
  timeFilter: string;
  transactionCount: ITransactionCountChartData;
  transactionCountData?: ITransactionCountFetchData;
}

export function TransactionCountChart(props: ITransactionCountChartProps) {
  const { timeFilter, transactionCount, transactionCountData } = props;
  const router = useRouter();

  const itemSortReverse = (itemA: ChartTooltipItem, itemB: ChartTooltipItem) =>
    itemB.datasetIndex - itemA.datasetIndex;

  const handleClick = useCallback(
    (_, elements) => {
      if (elements.length < 1) return;
      if (!transactionCountData) return;

      const { fromTimestampISO, toTimestampISO } = transactionCountData.data[
        elements[0]._index * 3
      ];

      const filter = transformTimeFilterToString(
        [utc(fromTimestampISO), utc(toTimestampISO)],
        'timestampISO',
      );

      router.push({
        pathname: '/transactions',
        query: { filter },
      });
    },
    [router, transactionCountData],
  );

  return (
    <CustomChart
      id={`TransactionCountChart ${timeFilter}`}
      data={transactionCount}
      options={{
        responsive: true,
        onClick: handleClick,
        maintainAspectRatio: false,
        tooltips: {
          ...TOOLTIP_STYLE_CONFIG,
          mode: 'index',
          itemSort: itemSortReverse,
          callbacks: {
            title: (tooltipItem: ChartTooltipItem[]) => {
              const count = tooltipItem.reduce((a: number, c: ChartTooltipItem) => {
                a += c.yLabel as number;
                return a;
              }, 0);

              return `Transaction Count - ${formatIntegersWithComma(count)}`;
            },
            label: (tooltipItem: ChartTooltipItem, data: ChartData) =>
              `${data.datasets[tooltipItem.datasetIndex].label} - ${formatWithCommas(
                tooltipItem.yLabel,
              )}`,
            labelColor: (tooltipItem: ChartTooltipItem, chart: Chart) => {
              const { datasetIndex } = tooltipItem;

              const backgroundColor = chart.config.data.datasets[datasetIndex]
                .backgroundColor as string[];

              return {
                borderColor: 'transparent',
                backgroundColor,
              };
            },
          },
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                labelString: 'Value',
              },
              stacked: true,
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                fontColor: GRID_NUMBER_COLOR,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                labelString: 'Value',
              },
              stacked: true,
              barThickness: 32,
              ticks: {
                stepSize: Math.ceil(roundUpToNearestAllZeros(transactionCount.max) / 5),
                beginAtZero: true,
                fontColor: GRID_NUMBER_COLOR,
                padding: 24,
                callback: (label) => formatWithCommas(label),
              },
              afterTickToLabelConversion: (scaleInstance) => {
                scaleInstance.ticks[scaleInstance.ticks.length - 1] = null;
              },
              gridLines: {
                borderDash: [2, 5],
                drawBorder: false,
                zeroLineWidth: 0,
                color: GRID_LINE_COLOR,
              },
            },
          ],
        },
      }}
      type={EChartType.Bar}
    />
  );
}
