import { Unsplash } from "@styled-icons/boxicons-logos";

import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div>
        <Unsplash />
      </div>
      <h1>Unsplash</h1>
    </div>
  );
};

export default Logo;
