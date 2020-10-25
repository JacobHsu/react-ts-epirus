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

## website setting

react-ts-epirus\src\theming\index.ts

```js
const DEFAULT: IThemeConfig = {
  currency: 'ETH',
  smallCurrency: 'Wei',
  windowTitle: 'Epirus | Blockchain Explorer',
  companyLink: 'https://w3l.cc/about',
  supportEmail: 'support@web3labs.com',
  logo: '/static/logo.svg',
  logoFavicon: '/static/logo-favicon.jpg',
  favicon: {
    '32': '/static/favicon-32x32.png',
    '16': '/static/favicon-16x16.png',
  },
};
```

## transactions

http://localhost:3000/transactions/

[開發智能合約 - 什麼是 Gas](https://ithelp.ithome.com.tw/m/articles/10201207)

src\components\pages\transactions\transaction-details\data.tsx

```js
    [
      {
        name: 'Transaction Fee',
        value: `${formatWithCommas(cumulativeGasUsed, 0, 0)} ${themed('smallCurrency')}`,
      },
    ],
```

## Account Details

http://localhost:3000/accounts/0xd..

src\components\pages\accounts\account-details\data.tsx

```js
    additionalDetails: [
      [
        {
          name: 'Balance',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 12 }}
              contentToCopy={`${formatWithCommas(balance, 0, 0)} ${themed('smallCurrency')}`}
            >
              {`${formatWithCommas(ethBalance)} ${currency}`}
            </ToolTipContentInline>
          ),
        },
      ],
    ],
```

