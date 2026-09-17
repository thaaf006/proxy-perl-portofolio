export type PixelCamelState = "idle" | "run" | "jump";

type PixelCamelProps = {
  className?: string;
  label?: string;
  state?: PixelCamelState;
};

export function PixelCamel({
  className = "",
  label = "Pixel camel",
  state = "idle",
}: PixelCamelProps) {
  return (
    <svg
      className={`pixel-camel pixel-camel--${state} ${className}`}
      data-state={state}
      viewBox="0 0 64 40"
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      shapeRendering="crispEdges"
    >
      <g className="pixel-camel__sprite">
        <path
          className="pixel-camel__shadow"
          d="M8 36h42v2H8z"
        />
        <g className="pixel-camel__body">
          <path
            fill="currentColor"
            d="M4 17h5v-3h3v-2h5V9h3V6h8v2h3v5h3V9h3V6h8v2h3v5h3V8h3V4h7v2h4v8h-3v3h-9v5h-4v7H12v-4H9v-4H4z"
          />
          <path fill="var(--primary)" d="M17 14h28v3H17zM52 9h3v3h-3z" />
          <path fill="currentColor" d="M1 14h4v3H3v4H1zM48 19h5v3h-5z" />
          <rect x="59" y="8" width="2" height="2" fill="var(--background)" />
        </g>
        <g className="pixel-camel__legs pixel-camel__legs--idle" fill="currentColor">
          <path d="M13 27h5v9h-5zM23 27h5v7h3v2h-8zM35 27h5v9h-5zM44 27h5v7h3v2h-8z" />
        </g>
        <g className="pixel-camel__legs pixel-camel__legs--run-a" fill="currentColor">
          <path d="M13 27h5v5h-3v4H9v-3h4zM23 27h5v6h5v3H25v-3h-2zM35 27h5v5h-3v4h-6v-3h4zM44 27h5v6h6v3h-9v-3h-2z" />
        </g>
        <g className="pixel-camel__legs pixel-camel__legs--run-b" fill="currentColor">
          <path d="M13 27h5v6h5v3h-8v-3h-2zM23 27h5v5h-3v4h-6v-3h4zM35 27h5v6h6v3h-9v-3h-2zM44 27h5v5h-3v4h-6v-3h4z" />
        </g>
        <g className="pixel-camel__legs pixel-camel__legs--jump" fill="currentColor">
          <path d="M13 27h7v4h5v3H15v-3h-2zM31 27h7v4h5v3H33v-3h-2zM44 27h5v5h-8v-3h3z" />
        </g>
      </g>
    </svg>
  );
}
