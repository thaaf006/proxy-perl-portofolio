const ticker =
  "PROXY PERL  •  12 PROFILES  •  .PL  •  .PM  •  { CODE }  •  ONE GROUP  •  $_  •  DIGITAL ARCHIVE  •  ";

export function TechnicalTicker() {
  return (
    <div
      className="technical-ticker"
      role="note"
      aria-label="PROXY PERL — 12 profiles, one group"
    >
      <div aria-hidden="true">
        <span>{ticker}</span>
        <span>{ticker}</span>
      </div>
    </div>
  );
}
