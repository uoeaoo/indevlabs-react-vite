import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link
      to="https://indevlabs.ru/"
      target="_blank"
      aria-label="Visit indevlabs"
      className={styles.logo}
    >
      Индев<span>Лабс</span>
    </Link>
  );
}

export default Logo;
