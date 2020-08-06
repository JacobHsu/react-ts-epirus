import React from 'react';

import { DropZoneFileListItem } from './drop-zone-file-list-item';

export interface IDropZoneFileListProps {
  onDeleteClick(index: number): void;
  list: File[];
}

export function DropZoneFileList(props: IDropZoneFileListProps) {
  const renderDroppedFiles = () =>
    props.list.map((file, index) => (
      <DropZoneFileListItem
        key={`file-${index}`}
        onDeleteClick={() => props.onDeleteClick(index)}
        {...file}
      >
        {file.name}
      </DropZoneFileListItem>
    ));

  return (
    <>
      <style jsx>{`
        ul.file-list {
          margin-top: 24px;
          list-style-type: none;
        }
      `}</style>
      <ul className="file-list">{renderDroppedFiles()}</ul>
    </>
  );
}
