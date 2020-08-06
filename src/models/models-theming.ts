import { IDictionary } from 'models/models-general';

export interface IThemeConfig {
  currency: string;
  smallCurrency: string;
  windowTitle: string;
  companyLink: string;
  supportEmail: string;
  logo: string;
  logoFavicon: string;
  favicon: string | IDictionary<string>;
}
