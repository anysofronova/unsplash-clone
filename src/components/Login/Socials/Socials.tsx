import { Google, Facebook, Github } from "@styled-icons/boxicons-logos";

import styles from "./Socials.module.scss";

const Socials = () => {
  return (
    <div className={styles.socialContainer}>
      <div className={styles.social}>
        <Google />
      </div>
      <div className={styles.social}>
        <Facebook />
      </div>
      <div className={styles.social}>
        <Github />
      </div>
    </div>
  );
};

export default Socials;
