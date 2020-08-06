import Link from 'next/link';
import React from 'react';

import { ICON } from 'components/svg';
import {
  BUTTON_GREY,
  FONT_WEIGHT_TEXT,
  FONT_WEIGHT_TITLE,
  GREY,
  HOVER_LINK_GREY,
} from 'data/data-style';
import { IMenuItem } from 'models/models-side-menu';

export interface IMenuSideDesktopItemProps extends IMenuItem {
  isSelected: boolean;
}

function MenuSideDesktopItems(props: IMenuSideDesktopItemProps) {
  const { externalPath, iconType, isSelected, name } = props;
  const href = externalPath || `/${name.toLowerCase()}`;

  return (
    <>
      <style jsx>{`
        a.MenuSideDesktopItem {
          display: flex;
          width: calc(100% - 28px);
          height: 48px;
          font-size: 14px;
          padding-left: 28px;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          color: ${GREY};
          opacity: ${isSelected ? 1 : 0.6};
          background-color: ${isSelected ? BUTTON_GREY : 'transparent'};
          font-weight: ${isSelected ? FONT_WEIGHT_TITLE : FONT_WEIGHT_TEXT};
        }
        a.MenuSideDesktopItem:hover {
          background-color: ${HOVER_LINK_GREY};
          opacity: 1;
        }
        a.MenuSideDesktopItem:active {
          background-color: ${BUTTON_GREY};
          opacity: 1;
        }
        span {
          margin-left: 28px;
        }
      `}</style>
      {externalPath ? (
        <a className="MenuSideDesktopItem" href={href} rel="noreferrer noopener" target="_blank">
          {ICON[iconType]}
          <span>{name}</span>
        </a>
      ) : (
        <Link href={href}>
          <a className="MenuSideDesktopItem">
            {ICON[iconType]}
            <span>{name}</span>
          </a>
        </Link>
      )}
    </>
  );
}

export default MenuSideDesktopItems;
