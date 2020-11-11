# accounts

http://localhost:3000/accounts/0x6572Ff137c4220428B1aED6a6dE1Db3Fdd66BD6E

components\pages\accounts\account-details\index.tsx

```js
import { TransactionsTable } from 'components/pages/transactions/transactions-table';

    // https://[domain]/api/accounts/0xc491a01aade0465f1be82e41d6733dbde709db57/transactions
    const transactionsConfig = {
      apiLink: '/accounts/[detailsHash]/[tab]',
      pathname: '/accounts/[detailsHash]/[tab]',
      params: { detailsHash, tab: 'transactions' },
    };
    
        name: 'Transactions',
        link: getLink(transactionsConfig),
        element: (
          <TransactionsTable
            fetchConfig={transactionsConfig}

    return (
      <DetailsContent
        breadcrumbs={[
          {
            name: 'Accounts',
            value: null,
          },
```

components\pages\transactions\transactions-table\index.tsx

```js
import { TableContent } from 'components/table-content';

  return (
    <TableContent
      breadcrumbs={[
      data={data}
```

```js
import useTableFetch from 'utils/api/use-table-fetch';
import {
  ETransactionsSortAndFilterType,
  ITransactionsTableFetch,
} from 'models/models-table-transactions';
const [state, handleChangeFilterParams] = useTableFetch<ITransactionsTableFetch>(fetchConfig);
const { currentFilters, data, error, filterParams, loading } = state;
```

src\models\models-table-transactions.ts

```js
export interface ITransactionsTableFetch {
  paging: IPaging;
  data: ITransactionsData[];
}
```

utils\api\use-table-fetch.ts

(參數): 回傳[{}]
```js
import { fetchData } from './queries';

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
  // fetchUrl: /accounts/0xc491a01AAdE0465F1bE82e41d6733dbDe709Db57/transactions
  const { data, error } = useSWR<T, IError>(fetchUrl, fetchData);
```

utils\api\queries.ts

```js
export async function fetchData(url: string, opts?: IDictionary<any>) {
  let auth;
  let authHeaders = {};
  let root = API_URL;

  if (isBrowser()) {
    auth = new Authentication();
    const user: IUser = await auth.getUser();

    if (user && user.access_token) {
      authHeaders = { Authorization: `Bearer ${user.access_token}` };
    }
  } else if (!root.startsWith('http')) {
    root = 'http://api:8081/api';
  }

  const defaultOpts = {
    headers: {
      ...authHeaders,
    },
  };
```