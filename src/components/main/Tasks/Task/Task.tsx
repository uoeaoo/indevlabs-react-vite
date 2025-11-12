import styles from "./Task.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";

export interface TaskProps {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  completed: boolean;
  onToggleCompleted: () => void;
}

function Task({
  id,
  title,
  description,
  creationDate,
  completed,
  onToggleCompleted,
}: TaskProps) {
  return (
    <div
      className={`${styles.task} ${completed ? styles.completed : ""}`}
      aria-label={`Task: ${title}`}
    >
      <div className={styles.taskHeader}>
        <h3 className={styles.taskHeaderTitle}>{title}</h3>

        <button
          className={`${styles.taskHeaderChecker} ${
            completed ? styles.checked : ""
          }`}
          onClick={onToggleCompleted}
          aria-label={completed ? "Mark as incomplete" : "Mark as completed"}
          aria-pressed={completed}
        >
          <CheckCircleIcon className={styles.taskHeaderCheckerIcon} />
        </button>
      </div>

      <div className={styles.taskBody}>
        <p className={styles.taskBodyDescription}>{description}</p>
        <small className={styles.taskBodyDate}>{creationDate}</small>
      </div>

      <Link
        to={`/task/${id}`}
        aria-label={`View details of task: ${title}`}
        className={styles.taskBodyButton}
      >
        <span>Show Task</span>
        <ArrowOutwardIcon className={styles.taskBodyButtonIcon} />
      </Link>
    </div>
  );
}

export default Task;
