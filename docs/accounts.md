# accounts

http://localhost:3000/accounts/0x6572Ff137c4220428B1aED6a6dE1Db3Fdd66BD6E

components\pages\accounts\account-details\index.tsx

```js
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
```