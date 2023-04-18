import { FC, useState } from "react";

import styles from "./AddAPhoto.module.scss";
import { ModalAddImage } from "../../Modals";

export const AddAPhoto: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div className={styles.addAPhoto}>
      <button onClick={() => setModal(true)} className={styles.button}>
        Add a photo
      </button>
      {modal && <ModalAddImage setModal={setModal} />}
    </div>
  );
};
