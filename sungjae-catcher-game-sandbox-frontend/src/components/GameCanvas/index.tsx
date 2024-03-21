// DotCatcherGame.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameCanvas.module.css";
import { Dot } from "../../Model/types";
import { useQueryPostMutation } from "../../hooks/useReactQuery";

const DotCatcherGame = () => {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [catcherPosition, setCatcherPosition] = useState<number>(
    window.innerWidth >= 800 ? 400 : 250
  ); //Initial x position for catcher
  const [dots, setDots] = useState<Dot[]>([]);
  const navigate = useNavigate();
  const { mutate } = useQueryPostMutation(`/api/records`, ["recordList"]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        const name = prompt(
          `Game is over now. Your total score is ${score}. Please enter your name for saving record. You will redirect to leader board for checking ranking.`,
          "JOO Sungjae"
        );
        const requstBody = {
          name: name,
          score: Number(score),
        };
        mutate(requstBody);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mutate, navigate, score, timeLeft]);

  //Handling Keyboard movement for catcher
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setCatcherPosition((prevPos) => Math.max(0, prevPos - 20));
      } else if (event.key === "ArrowRight") {
        const maxX = window.innerWidth >= 800 ? 799 : 499; // Adjust max X for mobile devices
        setCatcherPosition((prevPos) => Math.min(maxX, prevPos + 20));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  //Handling Random dot creation
  useEffect(() => {
    const dotInterval = setInterval(() => {
      const randomX = Math.random() * (window.innerWidth >= 800 ? 750 : 475); // Adjust max X for mobile devices
      const randomType = Math.random() < 0.5 ? "p" : "e"; // Randomly select dot type
      const randomVariant =
        randomType === "p"
          ? Math.floor(Math.random() * 4) + 1 // P1 - P4
          : Math.floor(Math.random() * 2) + 1; // E1 - E2
      setDots((prevDots) => [
        ...prevDots,
        {
          id: Date.now(),
          x: randomX,
          y: 0,
          type: `${randomType}${randomVariant}`,
        },
      ]);
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  //Handling dot falling
  useEffect(() => {
    const moveDots = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          y: dot.y + 117, // Adjust the speed of falling dots here (10px per interval)
        }))
      );
    };

    const dotMoveInterval = setInterval(moveDots, 700); // Adjust the interval for smoother movement

    return () => clearInterval(dotMoveInterval);
  }, []);

  //Handling Collision Detection for scoring
  useEffect(() => {
    const checkCollision = () => {
      setDots((prevDots) => {
        const updatedDots = prevDots.filter((dot) => {
          const withinXBoundary =
            catcherPosition + 40 >= dot.x && catcherPosition - 80 <= dot.x;
          const withinYBoundary = window.innerHeight - 100 <= dot.y; //Adjust for catcher height
          if (withinXBoundary && withinYBoundary) {
            if (dot.type.startsWith("p")) {
              setScore((prevScore) => prevScore + 50); //Increase score for dot types starting with 'p'
            } else if (dot.type.startsWith("e")) {
              setScore((prevScore) => Math.max(0, prevScore - 100)); //Decrease score for dot types starting with 'e'
            }
            return false;
          }
          return true;
        });

        return updatedDots;
      });
    };

    const collisionInterval = setInterval(() => {
      checkCollision();
    }, 100);

    return () => clearInterval(collisionInterval);
  }, [catcherPosition]);

  return (
    <div className={styles.gameContainer}>
      <span className={styles.score}>Score: {score}</span>
      <span className={styles.timeLeft}>Time: {timeLeft}</span>
      <div className={styles.catcher} style={{ left: catcherPosition }}></div>
      {dots
        .filter((dot) => dot.y <= window.innerHeight - 100) // Filter out dots beyond the container
        .map((dot) => (
          <div
            key={dot.id}
            className={`${styles.dot} ${styles[`${dot.type}`]}`}
            style={{ left: dot.x, top: dot.y }}
          ></div>
        ))}
    </div>
  );
};

export default DotCatcherGame;
