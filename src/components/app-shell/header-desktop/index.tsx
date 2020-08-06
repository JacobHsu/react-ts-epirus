import Link from 'next/link';
import React from 'react';

import { HEADER_HEIGHT, HI_BLUE, MIN_CONTENT_WIDTH, WHITE } from 'data/data-style';
import { themed } from 'theming';

import { HeaderDesktopRightContent, IHeaderDesktopRightContentProps } from './right-content';

export function HeaderDesktop(props: IHeaderDesktopRightContentProps) {
  return (
    <>
      <style jsx>{`
        header {
          position: relative;
          height: ${HEADER_HEIGHT}px;
          width: 100%;
          background-color: ${HI_BLUE};
          z-index: 999;
          /* This is to keep header above the table */
          /* Assumes max table rows are less than 999 */
        }
        h1 {
          line-height: 24px;
          font-size: 20px;
          font-weight: 500;
          color: ${WHITE};
          letter-spacing: 7px;
        }
        div.container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          margin-right: auto;
          margin-left: auto;
        }
        a.logo {
          display: block;
          width: 177px;
          height: ${HEADER_HEIGHT}px;
          margin-left: 28px;
        }
        a.logo img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
        @media (min-width: ${MIN_CONTENT_WIDTH}px) {
          div.container {
            width: ${MIN_CONTENT_WIDTH}px;
          }
        }
      `}</style>
      <header>
        <div className="container">
          <Link href="/">
            <a className="logo">
              <img src={themed('logo')} alt="Logo" />
            </a>
          </Link>
          <HeaderDesktopRightContent {...props} />
        </div>
      </header>
    </>
  );
}
