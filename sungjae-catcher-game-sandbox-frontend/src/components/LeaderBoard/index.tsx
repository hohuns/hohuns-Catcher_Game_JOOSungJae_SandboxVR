import styles from "./LeaderBoard.module.css";
import { useQueryFetchGet } from "../../hooks/useReactQuery";
import { useNavigate } from "react-router-dom";
import { leaderBoardDataType } from "../../Model/types";
import moment from "moment";
import _ from "lodash";

const Leaderboard = () => {
  const { data } = useQueryFetchGet(`/api/records`, ["recordList"]);
  const navigate = useNavigate();

  return (
    <div className={styles.gameContainer}>
      <div className={styles.rankContainer}>
        <span className={styles.headerText}>Leader Board</span>
        {!_.isEmpty(data) ? (
          data?.data?.records?.map((data: leaderBoardDataType) => (
            <div className={styles.rank} key={data?._id}>
              <span className={styles.characterName}>Name: {data?.name}</span>
              <span className={styles.score}>Score: {data?.score}</span>
              <span className={styles.date}>
                Date: {moment(data?.createdAt).format("YYYY-MM-DD")}
              </span>
            </div>
          ))
        ) : (
          <span className={styles.headerText}>No Data Found</span>
        )}
        <button
          className={styles.button}
          onClick={() => {
            navigate("/menu");
          }}
        >
          Go back to menu
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
