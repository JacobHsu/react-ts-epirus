import React from 'react';

import { DESKTOP_WIDTH } from 'data/data-style';

import { Tab } from './tab';

export interface ITabsProps {
  activeIndex: number;
  items: string[];
  onSelectTab(index: number): void;
}

export function Tabs(props: ITabsProps) {
  const { activeIndex, items, onSelectTab } = props;
  return (
    <>
      <style jsx>{`
        div.Tabs {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: row;
          height: 62px;
          width: 100%;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.Tabs {
            height: 48px;
            width: 100%;
          }
        }
      `}</style>
      <div className="Tabs">
        {items.map((item: string, index: number) => (
          <Tab key={item} isActive={activeIndex === index} onClick={() => onSelectTab(index)}>
            {item}
          </Tab>
        ))}
      </div>
    </>
  );
}
