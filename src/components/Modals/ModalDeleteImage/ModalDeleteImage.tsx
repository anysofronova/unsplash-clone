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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const checkAPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
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
          setIsLoading(false);
        })
        .catch(() => {
          setError(true);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className={styles.modal}>
      <form className={styles.form}>
        <h2>Are you sure?</h2>
        <label>
          <p>Password</p>
          <input
            required={true}
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
          <button
            className={"button"}
            onClick={checkAPassword}
            disabled={isLoading || !password}
          >
            Submit
          </button>
        </div>
        {error && <p className={styles.error}>Wrong Password</p>}
      </form>
    </div>
  );
};

export default ModalDeleteImage;
