import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./NoResults.module.scss";

type TNoResults = {
  isNoResults: boolean;
};
export const NoResults: FC<TNoResults> = ({ isNoResults }) => {
  return (
    <div className={styles.notFound}>
      <div className={styles.face}>
        <div className={styles.band}>
          <div className={styles.red} />
          <div className={styles.white} />
          <div className={styles.blue} />
        </div>
        <div className={styles.eyes} />
        <div className={styles.dimples} />
        <div className={styles.mouth} />
      </div>

      <h1 className={styles.title}>
        {isNoResults ? "No results" : "Oops! Something went wrong!"}
      </h1>
      {!isNoResults && (
        <Link to={"/"}>
          <div className={styles.btn}>Return to Home</div>
        </Link>
      )}
    </div>
  );
};
