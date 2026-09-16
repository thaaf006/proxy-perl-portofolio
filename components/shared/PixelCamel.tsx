type PixelCamelProps = {
  className?: string;
  label?: string;
  walking?: boolean;
};

export function PixelCamel({
  className = "",
  label = "Pixel camel",
  walking = false,
}: PixelCamelProps) {
  return (
    <svg
      className={`pixel-camel ${walking ? "is-walking" : ""} ${className}`}
      viewBox="0 0 48 32"
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
    >
      <g className="pixel-camel__sprite">
        <g className="pixel-camel__body">
          <path
            fill="currentColor"
            d="M7 13h5v-2h4V8h3V6h5v2h3V6h5v2h3v5h3V7h3V5h5v2h2v6h-3v3h-6v9h-4V18H13v7H9v-8H7z"
          />
          <path fill="var(--primary)" d="M18 11h13v3H18z" />
          <path fill="currentColor" d="M3 11h4v2H5v3H3zM40 3h3v2h-3z" />
          <rect x="43" y="8" width="2" height="2" fill="var(--background)" />
        </g>
        <g className="pixel-camel__leg pixel-camel__leg--a" fill="currentColor">
          <path d="M10 22h4v6h-2v2H8v-2h2zM28 22h4v6h3v2h-7z" />
        </g>
        <g className="pixel-camel__leg pixel-camel__leg--b" fill="currentColor">
          <path d="M16 22h4v6h3v2h-7zM34 22h4v8h-5v-2h1z" />
        </g>
      </g>
    </svg>
  );
}
