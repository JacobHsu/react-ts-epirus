import React from 'react';

import { TableContent } from 'components/table-content';
import {
  EDirectionType,
  EDisplayTitleType,
  IFetchConfig,
  IHeaderItem,
} from 'models/models-data-general';
import { EPageType, IDictionary } from 'models/models-general';
import { IDropdownOption } from 'models/models-inputs';
import { ISortValues } from 'models/models-table-general';
import {
  ETransactionsSortAndFilterType,
  ITransactionsTableFetch,
} from 'models/models-table-transactions';
import { transformMultiFilterToString } from 'utils/api/queries-format';
import useTableFetch from 'utils/api/use-table-fetch';
import { useIsDesktop } from 'utils/dimensions';
import { defined } from 'utils/variable-evaluation';

const DEFAULT_SORT_CONFIG = {
  direction: EDirectionType.DESC,
  sort: ETransactionsSortAndFilterType.timestampISO,
};

export interface ITransactionsTableProps {
  fetchConfig: IFetchConfig;
  headerItems: IHeaderItem[];
  noElementsMessage?: string;
  displayTitleType?: EDisplayTitleType;
}

export function TransactionsTable({
  displayTitleType,
  fetchConfig,
  headerItems,
  noElementsMessage,
}: ITransactionsTableProps) {
  const isDesktop = useIsDesktop();
  const [state, handleChangeFilterParams] = useTableFetch<ITransactionsTableFetch>(fetchConfig);

  const handlePageNumberChange = (page: number) => {
    handleChangeFilterParams({ page });
  };

  const handleSortChange = (sortValues?: ISortValues) => {
    if (defined(sortValues)) {
      handleChangeFilterParams(sortValues);
    } else {
      handleChangeFilterParams(DEFAULT_SORT_CONFIG);
    }
  };

  const handleRowsDisplayedChange = (selectedOption: IDropdownOption) => {
    const size = parseFloat(selectedOption.value);
    const page = Math.floor((state.filterParams.size / size) * (state.filterParams.page || 0));
    handleChangeFilterParams({ size, page });
  };

  const handleFilterChange = (filters: IDictionary<any>) => {
    handleChangeFilterParams({
      filter: transformMultiFilterToString({
        ...state.currentFilters,
        ...filters,
      }),
      page: 0,
    });
  };

  const { currentFilters, data, error, filterParams, loading } = state;

  return (
    <TableContent
      breadcrumbs={[
        {
          name: 'Transactions',
          value: null,
        },
      ]}
      isFilterSet={!!filterParams.filter}
      headerItems={headerItems}
      noElementsMessage={noElementsMessage || 'There are no transactions to show.'}
      displayTitleType={displayTitleType}
      type={isDesktop ? EPageType.transactions : EPageType.transactionsMobile}
      data={data}
      error={error}
      loading={loading}
      tableFetchConfig={{
        pageNumberConfig: {
          page: filterParams.page,
          onPageNumberChange: handlePageNumberChange,
        },
        sortRowsConfig: {
          direction: filterParams.direction,
          sort: filterParams.sort,
          onSortChange: handleSortChange,
        },
        filterConfig: {
          currentFilters,
          onFilterChange: handleFilterChange,
        },
        rowsDisplayedConfig: {
          size: filterParams.size,
          onRowsDisplayedChange: handleRowsDisplayedChange,
        },
      }}
      title="Transactions"
    />
  );
}
