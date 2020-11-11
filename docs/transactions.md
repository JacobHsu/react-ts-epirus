# transactions

## Transaction Details

http://localhost:3000/transactions/0xfd2780a1b934644fa3872a30a0463d53dda14e8f7bae722c5ae7acb93a14e5e1


components\pages\transactions\transaction-details\index.tsx

```js
  const { data, error } = useSWR<ITransactionDetailsFetch, IError>(
    `/transactions/${detailsHash}`,
    fetchData,
  );
```

pages\transactions\[detailsHash]\[tab].tsx

```js
import { TransactionDetails } from 'components/pages/transactions/transaction-details';

function Transactions() {
  return <AppShell render={() => <TransactionDetails />} />;
}
```

components\pages\transactions\transaction-details\index.tsx

Tabs

```js
  const transactionFunctionInfo = useMemo((): IFunctionTableFetch => {
    if (!data) return;

    if (data.functionMeta) {
      return {
        data: [
          {
            functionName: data.functionMeta.functionName,
            parameters: data.functionMeta.params,
          },
        ],
      };

import { TableContent } from 'components/table-content';

        name: 'Function',
        // This isn't a real table with paging etc,
        // it is only used to display a single entry
        link: getLink({
          pathname: '/transactions/[detailsHash]/[tab]',
          params: { detailsHash, tab: 'function' },
        }),
        element: (
          <TableContent
           data={transactionFunctionInfo}
```

components\table-content\desktop\table\index.tsx

```js
import { TableData } from './table-data';
      {!isZeroElements && <TableData type={type} dataRows={dataRows} headerItems={headerItems} />}
```

components\table-content\desktop\table\table-data.tsx

```js
import { TableDataRow } from './table-data-row';
          <TableDataRow
            key={`${row.hash || row.address || row.metadataFileId}-${index}`}
            index={index}
            type={type}
            data={row}
            headerItems={headerItems}
          />
```

## from account detail

components\pages\accounts\account-details\index.tsx

```js
import { TransactionsTable } from 'components/pages/transactions/transactions-table';
    const transactionsConfig = {
      apiLink: '/accounts/[detailsHash]/[tab]',
      pathname: '/accounts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'transactions' },
    };
          <TransactionsTable
            fetchConfig={transactionsConfig}
```

components\pages\transactions\transactions-table\index.tsx

```js
import useTableFetch from 'utils/api/use-table-fetch';
import useSWR from 'swr';

export function TransactionsTable({
  fetchConfig,
}: ITransactionsTableProps) {

  const [state, handleChangeFilterParams] = useTableFetch<ITransactionsTableFetch>(fetchConfig);
```

utils/api/use-table-fetch

```js
import useSWR from 'swr';
const { data, error } = useSWR<T, IError>(fetchUrl, fetchData);

return [
  {
    data: stickyData,
  },
  handleChangeFilterParams,
];
```
