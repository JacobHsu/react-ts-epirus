# api

src\utils\api\queries.ts

`export async function fetchData(url: string, opts?: IDictionary<any>) {`

components\pages\contracts\contract-details\index.tsx

```js
  const { data, error } = useSWR<IContractDetailsFetch, IError>(
    `/contracts/${detailsHash}`,
    fetchData,
  );
```
