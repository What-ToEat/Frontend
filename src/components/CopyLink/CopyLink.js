import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './CopyLink.css';
import { useParams } from 'react-router-dom';

const CopyLink = () => {
  const { hash } = useParams();
  const [copied, setCopied] = useState(false);
  const link = `http://localhost:3000/vote/${hash}`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="copy-link-container">
      <label>투표 초대 링크</label>
      <div className="link-box">
        <input type="text" value={link} readOnly />
        <CopyToClipboard text={link} onCopy={handleCopy}>
          <button className="copy-button">
            {copied ? '✔️' : '📋'}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopyLink;
