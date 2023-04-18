import { Link } from "react-router-dom";
import { Unsplash } from "@styled-icons/boxicons-logos";

import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <Link to={"/home"}>
      <div className={styles.logo}>
        <div>
          <Unsplash />
        </div>
        <h1>Unsplash</h1>
      </div>
    </Link>
  );
};
