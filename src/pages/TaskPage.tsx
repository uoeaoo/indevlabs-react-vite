import { useParams, Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import styles from "./TaskPage.module.css";
import Aside from "../components/main/Aside/Aside";
import TaskBody from "../components/main/TaskBody/TaskBody";

function TaskPage() {
  const { id } = useParams();
  const { tasks, loading } = useTasks();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className={styles.notFound}>
        <h2>Task not found</h2>
        <Link to="/">Back to Tasks</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Aside />
      <TaskBody task={task} />
    </div>
  );
}

export default TaskPage;
