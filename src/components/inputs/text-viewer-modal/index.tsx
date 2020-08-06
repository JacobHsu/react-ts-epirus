import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { TextViewerModal } from './text-viewer-modal';

export interface ITextViewerWrapperProps {
  title: string;
  children: string;
}

export function TextViewerWrapper(props: ITextViewerWrapperProps) {
  const [isOpen, toggleOpen] = useState(false);
  const { children, title } = props;
  return (
    <>
      <style jsx>{`
        button.toggle {
          font-size: 12px;
          line-height: 32px;
        }
      `}</style>
      <button className="toggle --text-link" onClick={() => toggleOpen(!isOpen)}>
        View
      </button>
      {isOpen && (
        <>
          {createPortal(
            <TextViewerModal title={title} onOkClick={() => toggleOpen(!isOpen)}>
              {children}
            </TextViewerModal>,
            document.body,
          )}
        </>
      )}
    </>
  );
}
