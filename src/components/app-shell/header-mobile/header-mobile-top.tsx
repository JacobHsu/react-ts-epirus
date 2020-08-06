import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { FONT_WEIGHT_TITLE, MIN_CONTENT_WIDTH, MOBILE_SMALL_WIDTH } from 'data/data-style';
import { themed } from 'theming';

import { resolveDetailsTitle, resolveTitle } from './data';

export interface IHeaderMobileTopProps {
  isDetails: boolean;
  pageName: string;
}

export function HeaderMobileTop(props: IHeaderMobileTopProps) {
  const { isDetails, pageName } = props;
  const title = isDetails ? resolveDetailsTitle(pageName) : resolveTitle(pageName);

  return (
    <>
      <style>{`
        div.HeaderMobileTop {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 26px;
          width: 100%;
        }
        a.logo,
        div.logo {
          width: 40px;
          height: 40px;
          color: inherit;
        }
        h1.title {
          font-size: 24px;
          line-height: 28px;
          font-weight: ${FONT_WEIGHT_TITLE};
          text-align: center;
        }
        h1.title.isDetails {
          font-size: 16px;
          line-height: 20px;
          max-width: 200px;
        }
        div.logo.--placeholder {
          opacity: 0;
        }
        a.logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          header {
            padding: 0 20px 58px;
            width: calc(100% - 40px);
          }
        }
        @media (min-width: ${MIN_CONTENT_WIDTH}px) {
          div.container {
            width: ${MIN_CONTENT_WIDTH - 112}px;
          }
        }
      `}</style>
      <div className="HeaderMobileTop">
        <Link href="/">
          <a className="logo">
            <img src={themed('logoFavicon')} alt="Logo" />
          </a>
        </Link>
        <h1
          className={classNames('title', {
            isDetails: isDetails || pageName === 'Metadata',
          })}
        >
          {title}
        </h1>
        <div className="logo --placeholder" />
      </div>
    </>
  );
}
