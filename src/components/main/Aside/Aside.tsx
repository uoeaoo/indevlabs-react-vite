import styles from "./Aside.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Aside() {
  return (
    <aside className={styles.aside}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.nav}>
          <Link
            to="https://github.com/uoeaoo"
            target="_blank"
            className={styles.link}
            aria-label="Visit GitHub profile"
          >
            <p className={styles.linkText}>GitHub</p>
            <GitHubIcon className={styles.linkIcon} />
          </Link>
          <Link
            to="https://t.me/sirnoname24"
            target="_blank"
            className={styles.link}
            aria-label="Visit Telegram profile"
          >
            <p className={styles.linkText}>Telegram</p>
            <TelegramIcon className={styles.linkIcon} />
          </Link>
          <Link
            to="https://spb.hh.ru/resume/03c88deaff0d6ac1f00039ed1f374b55543442"
            target="_blank"
            className={styles.link}
            aria-label="Visit HH.ru resume"
          >
            <p className={styles.linkText}>HH.RU</p>
            <SwitchAccountIcon className={styles.linkIcon} />
          </Link>
        </div>
      </div>
      <small>developed by uoeaoo</small>
    </aside>
  );
}

export default Aside;
