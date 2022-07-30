import { Unsplash } from "@styled-icons/boxicons-logos";

import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

const Logo = () => {
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

export default Logo;
