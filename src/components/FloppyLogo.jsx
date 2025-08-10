import React from 'react';

/** Ultra-minimal floppy logo. Keep shapes flat; works in dark/light. */
export default function FloppyLogo({ className = '', showDollar = false }) {
  return (
    <svg viewBox="0 0 64 64" aria-label="sshthings logo" className={className} role="img">
      <rect x="6" y="4" width="52" height="56" rx="6" fill="#1F2632"/>
      <rect x="14" y="8" width="36" height="16" fill="#0E1116"/>
      <rect x="14" y="28" width="36" height="12" rx="2" fill="#C9C1B0"/>
      <rect x="14" y="28" width="36" height="3" fill="#9EF0A2" opacity="0.85"/>
      <rect x="22" y="44" width="20" height="10" rx="2" fill="#12161E"/>
      {showDollar && (
        <text x="32" y="37" textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" fill="#0E1116">$</text>
      )}
    </svg>
  );
}
