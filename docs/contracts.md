# contracts

http://localhost:3000/contracts/0x0191d0d5147534611A625baede45b36137CeB9f6


components\pages\contracts\contract-details\index.tsx

import { DetailsContent } from 'components/details-content';


Contract Details

components\details-content\desktop\desktop-details-overview\desktop-additional-details\desktop-additional-details-button.tsx


DesktopDetailsHighlight

## table


components\pages\contracts\contract-details\index.tsx


TABS

```js
const transactionsConfig = {
    apiLink: '/contracts/[detailsHash]/[tab]', // https://www.ipublic.io/api/contracts/0x0191d0d5147534611A625baede45b36137CeB9f6/transactions
    pathname: '/contracts/[detailsHash]/[tab]',
    params: { detailsHash, tab: 'transactions' },
};

name: 'Transactions',
link: getLink(transactionsConfig),
element: (
    <TransactionsTable
    fetchConfig={transactionsConfig}
    headerItems={TRANSACTIONS_CONTRACT_HEADER_ITEMS}
    noElementsMessage="There are no transactions for this contract."
    displayTitleType={EDisplayTitleType.Tab}
    />
),
```

import { TransactionsTable } from 'components/pages/transactions/transactions-table';

components\pages\transactions\transactions-table\index.tsx

```js
const [state, handleChangeFilterParams] = useTableFetch<ITransactionsTableFetch>(fetchConfig);

import { TableContent } from 'components/table-content';
  const { currentFilters, data, error, filterParams, loading } = state;

  return (
    <TableContent
      data={data}

```

data\table-lookup\data-transactions.tsx

```html
    <CellValue
      contentToCopy={`${formatWithCommas(parseFloat(data.ethValue))} ${currency}`}
      unit={currency}
    >
      {formatWithCommas(parseFloat(data.ethValue))}
    </CellValue>
```