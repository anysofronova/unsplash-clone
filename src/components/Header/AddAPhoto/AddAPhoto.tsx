import { FC } from "react";
import styles from "./AddAPhoto.module.scss";

const AddAPhoto: FC = () => {
  return (
    <div className={styles.addAPhoto}>
      <button>Add a photo</button>
    </div>
  );
};

export default AddAPhoto;
