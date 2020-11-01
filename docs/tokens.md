# tokens

http://localhost:3000/tokens/0x0191d0d5147534611A625baede45b36137CeB9f6/transactions

pages\tokens\[detailsHash]\[tab].tsx

```js
import { TokenDetails } from 'components/pages/tokens/tokens-details';
function Tokens() {
  return <AppShell render={() => <TokenDetails />} />;
}
```
## Tabs & Table

components\pages\tokens\tokens-details\index.tsx

```js
const transactionsConfig = {
    apiLink: '/tokens/[detailsHash]/[tab]',
    pathname: '/tokens/[detailsHash]/[tab]',
    params: { detailsHash, tab: 'transactions' },
};

import { TransactionsTable } from 'components/pages/transactions/transactions-table';

    return [
      {
        name: 'Transactions',
        link: getLink(transactionsConfig),
        element: (
          <TransactionsTable
            fetchConfig={transactionsConfig}
            headerItems={TRANSACTIONS_TOKENS_HEADER_ITEMS}
            noElementsMessage="There are no transactions for this token."
            displayTitleType={EDisplayTitleType.Tab}
          />
        ),
      },
```

components\pages\transactions\transactions-table\index.tsx

```js
import useTableFetch from 'utils/api/use-table-fetch';

  const [state, handleChangeFilterParams] = useTableFetch<ITransactionsTableFetch>(fetchConfig);
  const { currentFilters, data, error, filterParams, loading } = state;

  return (
    <TableContent
         data={data}
```

src\utils\api\use-table-fetch.ts

```js
const useTableFetch = <T>(
  fetchConfig: IFetchConfig,
): [
  {
    error: IError | undefined;
    data: T | undefined;
    loading: boolean;
    currentFilters: IDictionary<string[]>;
    filterParams: IFetchParamsValues;
  },
  (nextFilterParams: Partial<IFetchParamsValues>) => void,
] => {
  const router = useRouter();

  const filterParams = router.query as any;

  const currentFilters = filterToCurrentSelectedOptions(
    Array.isArray(router.query.filter) ? router.query.filter[0] : router.query.filter,
  );

  const { apiLink, params } = fetchConfig;

  const {
    as: { pathname, query },
  } = generateLink(apiLink, { ...params, ...filterParams });

  const serializedQuery = serialize(query);
  const fetchUrl = serializedQuery ? `${pathname}?${serializedQuery}` : pathname;

  const { data, error } = useSWR<T, IError>(fetchUrl, fetchData); 
```
