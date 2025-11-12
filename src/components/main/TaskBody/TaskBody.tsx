import { Link, useNavigate } from "react-router-dom";
import styles from "./TaskBody.module.css";
import { useTasks, type Task } from "../../../hooks/useTasks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Title from "../../common/Title/Title";
import { useState } from "react";
import Modal from "../../common/Modal/Modal";

interface TaskBodyProps {
  task: Task;
}

function TaskBody({ task }: TaskBodyProps) {
  const { removeTask } = useTasks();
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = () => {
    removeTask(task.id);
    setIsConfirmOpen(false);
    navigate("/");
  };

  return (
    <main className={styles.dashboard}>
      <Title text="Task" span={`#${task.id}`} />
      <div className={styles.dashboardInside}>
        <div className={styles.taskPage}>
          <DeleteIcon
            aria-label="Delete task"
            className={styles.delete}
            onClick={() => setIsConfirmOpen(true)}
          />
          <div className={styles.header}>
            <h1 className={styles.title}>{task.title}</h1>
            <p className={styles.status}>
              Status:{" "}
              <span
                className={
                  task.completed ? styles.completed : styles.incomplete
                }
                aria-label={task.completed ? "Completed" : "In progress"}
              >
                {task.completed ? "Completed" : "In progress"}
              </span>
            </p>
          </div>

          <div className={styles.info}>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Full Info:</strong> {task.fullInfo}
            </p>
            <p>
              <strong>Created:</strong> {task.creationDate}
            </p>
            <p>
              <strong>Deadline:</strong> {task.deadline}
            </p>
          </div>

          <Link
            to="/"
            aria-label="Back to tasks list"
            className={styles.backButton}
          >
            <ArrowBackIcon /> Back to Tasks
          </Link>
        </div>
      </div>
      {isConfirmOpen && (
        <Modal onClose={() => setIsConfirmOpen(false)}>
          <div className={styles.confirmModal}>
            <h2>Are you sure?</h2>
            <div className={styles.buttons}>
              <button className={styles.confirmButton} onClick={handleDelete}>
                Yes, delete
              </button>
              <button
                className={styles.declineButton}
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

export default TaskBody;
