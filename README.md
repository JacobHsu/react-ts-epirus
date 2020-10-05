# Epirus UI - Blockchain explorer

`docker cp epirus-free_web_1:/app .`

## install

> 'TS_NODE_PROJECT' 不是內部或外部命令、可執行的程式或批次檔。

`npm install -g cross-env --save-dev `

react-ts-epirus\nodemon.json

```js
{
  "watch": ["server"],
  "exec": "cross-env TS_NODE_PROJECT=tsconfig.server.json node --inspect -r ts-node/register -r dotenv/config src/server/index.ts",
  "ext": "js ts"
}
```

.env

```js
API_URL=http://192.168.1.107/api
```

## API

### Filtering

To filter a table between two days use:

```
timestampISO gt 2019-07-30T12:20:24Z and timestampISO lt timestampISO lt 2019-07-30T12:20:39Z
```

or
`timestampISO gt 2019-07-30T12:20:24Z and timestampISO lt 2019-07-30T12:20:39Z`
eg/ `https://review.api.explorer.epirus.web3labs.com/transactions?sort=timestampISO&size=25&direction=DESC&page=1&timestampISO%20gt%202019-07-30T12:20:24Z%20and%20timestampISO%20lt%20timestampISO%20lt%202019-07-30T12:20:39Z`


## SiderBar

src\data\data-side-content.ts

```js
export const ITEMS_MAIN: IMenuItem[] = [
    {
    name: 'Blocks',
    iconType: EIconType.Blocks,
  },
  // {
  //   name: 'Network',
  //   iconType: EIconType.Network,
  // },
```

## NavBar

src\components\app-shell\header-desktop\right-content.tsx

```js
 <div className="HeaderDesktopRightContent">
        <div className="search-bar">
          <SearchBar isHeader {...searchBarProps} />
        </div>
        {/* <AccountInfo userProfile={userProfile} /> */}
      </div>
```