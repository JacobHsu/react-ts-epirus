import { IHeadMeta } from 'models/models-general';
import { IThemeConfig } from 'models/models-theming';

import themeList from '../theme.json';

const theme = themeList[process.env.SLUG];

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

const DEFAULT_HEAD_META: IHeadMeta = {
  title: DEFAULT.windowTitle,
  description: 'Blockchain Explorer for viewing Contracts, Tokens, Transactions and Blocks.',
  url: DEFAULT.companyLink,
  logo: DEFAULT.logo,
  favicon: DEFAULT.favicon,
};

export const themed = (key: string) => {
  if (theme && theme[key]) {
    return theme[key];
  } else {
    return DEFAULT[key];
  }
};

export const themedHead = (): IHeadMeta => ({
  ...DEFAULT_HEAD_META,
  url: themed('companyLink'),
  title: themed('windowTitle'),
  logo: themed('logo'),
  favicon: themed('favicon'),
});
