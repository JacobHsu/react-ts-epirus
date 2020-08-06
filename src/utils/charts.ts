import {
  IDashboardData,
  ITokensChartData,
  ITransactionCountChartData,
  ITransactionCountChartDataSet,
  ITransactionCountData,
} from 'models/models-dashboard';
import { IDictionary } from 'models/models-general';
import { ETagType } from 'models/models-tags';

import { createArrayOf, findArrayIndex } from './array';
import {
  formatIsoToDayMonth,
  formatIsoToHoursSeconds,
  formatIsoToMonthYear,
  spaceByCapitalLetter,
} from './format';
import { tokenDetailsTagLookup } from './tokens';

export function roundUpToNearestAllZeros(max: number) {
  const numberOfZeros = max.toFixed(0).split('').length - 1;
  const factor = parseFloat(`1${createArrayOf('0', numberOfZeros).join('')}`);
  return Math.ceil(max / factor) * factor;
}

const DASHBOARD_BACKGROUND_COLOR_LOOKUP: IDictionary<string> = {
  ERC20: '#C6F1E7',
  Fungible: '#C6F1E7',
  ['Fungible (ERC20)']: '#C6F1E7',
  ERC721: '#F8F2BF',
  ['Non-Fungible']: '#F8F2BF',
  ['Non-Fungible (ERC721)']: '#F8F2BF',
  ERC1155: '#F2E0C4',
  Hybrid: '#F2E0C4',
  ['Hybrid (ERC1155)']: '#F2E0C4',
  ['Contract Call']: '#C4F2DD',
  ['Contract Creation']: '#FBBBBB',
  Transfer: '#B9CEFE',
};

export const periods = ['HOURS', 'DAYS', 'MONTHS'] as const;

export type Period = typeof periods[number];
export type FilterLookup = { [key in Period]: string };

export const FILTER_LOOKUP: FilterLookup = {
  HOURS: 'Today', // the last 24 hours split into hourly chunks
  DAYS: 'Last 30 Days', // the last 30 days split into daily chunks
  MONTHS: 'Last Year', // the last 12 months split into monthly chunks
};

export type FilterFormatLookup = { [key in Period]: (value: string) => string };

const TIME_FORMAT_LOOKUP: FilterFormatLookup = {
  HOURS: formatIsoToHoursSeconds,
  DAYS: formatIsoToDayMonth,
  MONTHS: formatIsoToMonthYear,
};

export function transformFetchToTransactionChartData(
  config: ITransactionCountData[],
  timeFilter: string,
): ITransactionCountChartData {
  const labels = config.reduce((a: string[], c: ITransactionCountData, index: number) => {
    const time = TIME_FORMAT_LOOKUP[timeFilter](c.fromTimestampISO);

    if (index % 3 === 0) {
      a.push(time);
    }

    return a;
  }, []);

  const datasets = config.reduce((a: ITransactionCountChartDataSet[], c: ITransactionCountData) => {
    const label = spaceByCapitalLetter(c.name);

    const index = findArrayIndex(
      a,
      (dataSet: ITransactionCountChartDataSet) => dataSet.label === label,
    );

    if (index > -1) {
      a[index] = {
        ...a[index],
        data: [...a[index].data, c.total],
      };
    } else {
      a.push({
        data: [c.total],
        backgroundColor: DASHBOARD_BACKGROUND_COLOR_LOOKUP[label],
        label,
      });
    }

    return a;
  }, []);

  const total = datasets.reduce(
    (a: number, dataSet: ITransactionCountChartDataSet) =>
      a + dataSet.data.reduce((subTotal, c: number) => subTotal + c, 0),
    0,
  );

  const sets = config.reduce((a: any, c: ITransactionCountData) => {
    if (a[c.fromTimestampISO]) {
      a[c.fromTimestampISO].push(c.total);
    } else {
      a[c.fromTimestampISO] = [c.total];
    }

    return a;
  }, {});

  const max = Math.max.apply(
    null,
    Object.keys(sets).map((key: string) => sets[key].reduce((a, c) => a + c, 0)),
  );

  return {
    labels,
    datasets,
    total,
    max,
  };
}

export function transformFetchToTokensChartData(config: IDashboardData[]) {
  const result: ITokensChartData = {
    labels: config.map((item: IDashboardData) => tokenDetailsTagLookup(item.name as ETagType)),
    datasets: [
      {
        data: config.map((item: IDashboardData) => item.total),
        backgroundColor: config.map(
          (item: IDashboardData) => DASHBOARD_BACKGROUND_COLOR_LOOKUP[item.name],
        ),
      },
    ],
  };

  return result;
}

// Labels
export function getDayLabelArray(numItems, start) {
  // Create random array of objects
  const data = [];

  for (let i = start; i < numItems + start; i++) {
    let label = `${i}th`;

    if (i === 1) {
      label = `${i}st`;
    } else if (i === 2) {
      label = `${i}nd`;
    }

    data.push({
      label,
    });
  }

  return data;
}
