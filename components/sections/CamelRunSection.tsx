"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { CamelGameSprite } from "@/components/shared/CamelGameSprite";

type GameStatus = "ready" | "running" | "gameover";
type ObstacleType = "rock" | "crate" | "perl";
type Obstacle = {
  active: boolean;
  height: number;
  type: ObstacleType;
  width: number;
  x: number;
};

const bestScoreKey = "proxy-perl-camel-run-best";
const obstacleTypes: ObstacleType[] = ["rock", "crate", "perl"];

function formattedScore(score: number) {
  return String(score).padStart(5, "0");
}

export function CamelRunSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const camelRef = useRef<HTMLDivElement>(null);
  const obstacleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef(0);
  const visibleRef = useRef(false);
  const frameRef = useRef<(timestamp: number) => void>(() => undefined);
  const [status, setStatus] = useState<GameStatus>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const runtime = useRef({
    status: "ready" as GameStatus,
    elapsed: 0,
    distance: 0,
    last: 0,
    lastPaintedScore: -1,
    nextSpawn: 1100,
    playerY: 0,
    spawnCount: 0,
    speed: 225,
    velocity: 0,
    obstacles: obstacleTypes.map<Obstacle>((type) => ({
      active: false,
      height: type === "rock" ? 28 : type === "crate" ? 34 : 42,
      type,
      width: type === "rock" ? 38 : 34,
      x: 0,
    })),
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        setBest(Number(localStorage.getItem(bestScoreKey)) || 0);
      } catch {
        /* A private context may not expose localStorage. */
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const scheduleFrame = useCallback(() => {
    if (
      runtime.current.status === "running" &&
      visibleRef.current &&
      document.visibilityState === "visible" &&
      !rafRef.current
    ) {
      rafRef.current = requestAnimationFrame((timestamp) => frameRef.current(timestamp));
    }
  }, []);

  const endGame = useCallback(() => {
    const finalScore = Math.floor(runtime.current.elapsed / 100);
    runtime.current.status = "gameover";
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    setScore(finalScore);
    setStatus("gameover");
    setBest((currentBest) => {
      const nextBest = Math.max(currentBest, finalScore);
      try {
        localStorage.setItem(bestScoreKey, String(nextBest));
      } catch {
        /* The score remains available for the current render. */
      }
      return nextBest;
    });
  }, []);

  const jump = useCallback(() => {
    const game = runtime.current;
    if (game.status === "running" && game.playerY >= -0.5) {
      game.velocity = -620;
    }
  }, []);

  const startGame = useCallback(() => {
    const game = runtime.current;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    game.status = "running";
    game.elapsed = 0;
    game.distance = 0;
    game.last = 0;
    game.lastPaintedScore = -1;
    game.nextSpawn = 950;
    game.playerY = 0;
    game.spawnCount = 0;
    game.speed = 225;
    game.velocity = 0;
    game.obstacles.forEach((obstacle, index) => {
      obstacle.active = false;
      obstacle.x = 0;
      obstacleRefs.current[index]?.style.setProperty("display", "none");
    });
    camelRef.current?.style.setProperty("transform", "translate3d(0, 0, 0)");
    camelRef.current?.removeAttribute("data-airborne");
    camelRef.current?.firstElementChild?.setAttribute("style", "background-position: 0px 0px;");
    setScore(0);
    setStatus("running");
    scheduleFrame();
  }, [scheduleFrame]);

  const runFrame = useCallback((timestamp: number) => {
    rafRef.current = 0;
    const game = runtime.current;
    const stage = stageRef.current;
    if (game.status !== "running" || !stage) return;

    if (!game.last) game.last = timestamp;
    const delta = Math.min((timestamp - game.last) / 1000, 0.034);
    game.last = timestamp;
    game.elapsed += delta * 1000;
    game.speed = Math.min(405, 225 + game.elapsed * 0.012);
    game.nextSpawn -= delta * 1000;

    game.velocity += 1700 * delta;
    game.playerY = Math.min(0, game.playerY + game.velocity * delta);
    if (game.playerY === 0) game.velocity = 0;
    camelRef.current?.style.setProperty(
      "transform",
      `translate3d(0, ${game.playerY}px, 0)`,
    );
    camelRef.current?.toggleAttribute("data-airborne", game.playerY < -0.5);

    if (game.nextSpawn <= 0) {
      const freeIndex = game.obstacles.findIndex((obstacle) => !obstacle.active);
      if (freeIndex >= 0) {
        const obstacle = game.obstacles[freeIndex];
        const type = obstacleTypes[game.spawnCount % obstacleTypes.length];
        obstacle.type = type;
        obstacle.width = type === "rock" ? 38 : 34;
        obstacle.height = type === "rock" ? 28 : type === "crate" ? 34 : 42;
        obstacle.x = stage.clientWidth + 24;
        obstacle.active = true;
        const element = obstacleRefs.current[freeIndex];
        if (element) {
          element.className = `camel-obstacle camel-obstacle--${type}`;
          element.style.display = "block";
          element.style.width = `${obstacle.width}px`;
          element.style.height = `${obstacle.height}px`;
        }
        game.spawnCount += 1;
        game.nextSpawn = Math.max(920, 1740 - game.speed * 1.55) + (game.spawnCount % 3) * 120;
      }
    }

    const compact = stage.clientWidth < 600;
    const camelX = compact ? 32 : 58;
    const sprite = camelRef.current?.firstElementChild as HTMLElement | null;
    const frameWidth = compact ? 58 : 68;
    const frameDistance = compact ? 10 : 12;
    game.distance += game.speed * delta;
    if (game.playerY >= -0.5) {
      const runFrame = Math.floor(game.distance / frameDistance) % 5;
      if (sprite) {
        sprite.style.backgroundPosition = `${-runFrame * frameWidth}px 0px`;
        sprite.dataset.runFrame = String(runFrame);
      }
    }
    const camelWidth = compact ? 58 : 68;
    const camelHeight = compact ? 38 : 44;

    for (let index = 0; index < game.obstacles.length; index += 1) {
      const obstacle = game.obstacles[index];
      if (!obstacle.active) continue;
      obstacle.x -= game.speed * delta;
      obstacleRefs.current[index]?.style.setProperty(
        "transform",
        `translate3d(${obstacle.x}px, 0, 0)`,
      );
      if (obstacle.x < -obstacle.width - 20) {
        obstacle.active = false;
        obstacleRefs.current[index]?.style.setProperty("display", "none");
        continue;
      }

      const camelLeft = camelX + 10;
      const camelRight = camelX + camelWidth - 8;
      const camelBottom = -game.playerY + 4;
      const camelTop = camelBottom + camelHeight - 10;
      const obstacleLeft = obstacle.x + 5;
      const obstacleRight = obstacle.x + obstacle.width - 5;
      const obstacleTop = obstacle.height - 4;
      if (
        camelRight > obstacleLeft &&
        camelLeft < obstacleRight &&
        camelBottom < obstacleTop &&
        camelTop > 3
      ) {
        endGame();
        return;
      }
    }

    const nextScore = Math.floor(game.elapsed / 100);
    if (nextScore !== game.lastPaintedScore) {
      game.lastPaintedScore = nextScore;
      setScore(nextScore);
    }
    scheduleFrame();
  }, [endGame, scheduleFrame]);

  useEffect(() => {
    frameRef.current = runFrame;
  }, [runFrame]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        runtime.current.last = 0;
        if (!entry.isIntersecting) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        } else {
          scheduleFrame();
        }
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(section);

    const handleVisibility = () => {
      runtime.current.last = 0;
      if (document.visibilityState === "hidden") {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      } else {
        scheduleFrame();
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (!visibleRef.current) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select")) return;
      if (event.code !== "Space" && event.code !== "ArrowUp" && event.code !== "KeyW") return;
      event.preventDefault();
      if (runtime.current.status === "running") jump();
      else startGame();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("keydown", handleKey);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("keydown", handleKey);
      cancelAnimationFrame(rafRef.current);
    };
  }, [jump, scheduleFrame, startGame]);

  const handleStagePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    if (runtime.current.status === "running") jump();
    else startGame();
  };

  return (
    <section ref={sectionRef} id="camel-run" className="section camel-run-section">
      <div className="container">
        <p className="eyebrow"><span>05 /</span> Side quest</p>
        <div className="camel-run-heading">
          <h2>CAMEL<br />RUN_</h2>
        </div>
        <div className="camel-game-shell">
          <div className="camel-game-score" aria-live="polite">
            <span>SCORE <strong>{formattedScore(score)}</strong></span>
            <span>BEST <strong>{formattedScore(best)}</strong></span>
          </div>
          <div
            ref={stageRef}
            className="camel-game-stage"
            data-status={status}
            onPointerDown={handleStagePointer}
            aria-label="Camel Run game area. Press Space, Arrow Up, or W to jump. On touch devices, tap the game area."
          >
            <div className="camel-game-landscape" aria-hidden="true">
              <span>$</span><span>{"{}"}</span><span>%</span>
            </div>
            <div ref={camelRef} className="camel-game-player" aria-hidden="true">
              <CamelGameSprite />
            </div>
            {obstacleTypes.map((type, index) => (
              <div
                key={type}
                ref={(element) => { obstacleRefs.current[index] = element; }}
                className={`camel-obstacle camel-obstacle--${type}`}
                aria-hidden="true"
              />
            ))}
            <div className="camel-game-ground" aria-hidden="true" />
            {status !== "running" && (
              <div className="camel-game-message">
                <span>{status === "gameover" ? "RUN ENDED" : "READY"}</span>
                {status === "gameover" && <strong>SCORE {formattedScore(score)}</strong>}
                <button type="button" onClick={startGame}>
                  {status === "gameover" ? <><span>RESTART</span><RotateCcw size={14} /></> : "START RUN ↗"}
                </button>
              </div>
            )}
          </div>
          <div className="camel-game-controls">
            <span>SPACE / ↑ / W TO JUMP</span>
            <span>TAP GAME AREA ON MOBILE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
