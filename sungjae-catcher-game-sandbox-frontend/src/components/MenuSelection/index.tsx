import styles from "./MenuSelection.module.css";
import { Link, useNavigate } from "react-router-dom";

const MenuSelection = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.gameContainer}>
      <div className={styles.textContainer}>
        <span
          className={styles.menuText}
          onClick={() => {
            navigate("/game");
          }}
        >
          Start Game
        </span>
        <span
          className={styles.menuText}
          onClick={() => {
            navigate("/board");
          }}
        >
          Leader Board
        </span>
        <Link
          to="https://www.sungjae.org/"
          target="_blank"
          rel="noopener noreferer"
          className={styles.creditText}
        >
          By JOO Sungjae
        </Link>
      </div>
    </div>
  );
};

export default MenuSelection;
