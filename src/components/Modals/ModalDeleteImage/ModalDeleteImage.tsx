import { FC, useState, MouseEvent } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { ModalDeleteType } from "../../../@types/ModalDeleteType";
import styles from "../ModalAddImage/ModalAddImage.module.scss";
import clsx from "clsx";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const ModalDeleteImage: FC<ModalDeleteType> = ({ setModal, userId, id }) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const checkAPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const auth = getAuth();
    let credential = EmailAuthProvider.credential(
      auth.currentUser?.email || "",
      password
    );
    if (auth.currentUser) {
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(async () => {
          await deleteDoc(doc(db, `users/${userId}/photos`, id));
          setError(false);
        })
        .catch(() => setError(true));
    }
  };

  return (
    <div className={styles.modal}>
      <h2>Add a new photo</h2>
      <form className={styles.form}>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>

        <div className={styles.buttons}>
          <button
            className={clsx(styles.cancel)}
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button className={"button"} onClick={checkAPassword}>
            Submit
          </button>
        </div>
        {error && <p className={styles.error}>Wrong Password</p>}
      </form>
    </div>
  );
};

export default ModalDeleteImage;
