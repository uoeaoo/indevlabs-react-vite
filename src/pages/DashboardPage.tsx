import styles from "./DashboardPage.module.css";
import Aside from "../components/main/Aside/Aside";
import Body from "../components/main/Body/Body";

function DashboardPage() {
  return (
    <div className={styles.page}>
      <Aside />
      <Body />
    </div>
  );
}

export default DashboardPage;
