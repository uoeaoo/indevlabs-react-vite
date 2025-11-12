import styles from "./Body.module.css";
import Title from "../../common/Title/Title";
import Tasks from "../Tasks/Tasks";

function Body() {
  return (
    <main className={styles.dashboard}>
      <Title text="Dash" span="Board" />
      <div className={styles.dashboardInside}>
        <Tasks />
      </div>
    </main>
  );
}

export default Body;
