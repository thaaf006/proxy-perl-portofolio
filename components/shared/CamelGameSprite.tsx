type CamelGameSpriteProps = {
  airborne?: boolean;
};

export function CamelGameSprite({ airborne = false }: CamelGameSpriteProps) {
  return (
    <span
      className="camel-game-sprite"
      data-airborne={airborne ? "true" : undefined}
      aria-hidden="true"
    />
  );
}
