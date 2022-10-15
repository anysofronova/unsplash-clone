import { FC, useState } from "react";
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
import { SubmitHandler, useForm } from "react-hook-form";

type TInput = { password: string };

const ModalDeleteImage: FC<ModalDeleteType> = ({ setModal, userId, id }) => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const checkAPassword: SubmitHandler<TInput> = async (data) => {
    setIsLoading(true);
    const auth = getAuth();
    let credential = await EmailAuthProvider.credential(
      auth.currentUser?.email || "",
      data.password
    );
    if (auth.currentUser) {
      await reauthenticateWithCredential(auth.currentUser, credential)
        .then(async () => {
          await deleteDoc(doc(db, `users/${userId}/photos`, id));
          setError(false);
          setModal(false);
        })
        .catch(() => {
          setError(true);
        });
    }
    setIsLoading(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>();
  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={handleSubmit(checkAPassword)}>
        <h2>Are you sure?</h2>
        <label>
          <p>Password</p>
          <input
            {...register("password", {
              required: true,
            })}
            placeholder={"Password"}
            type={"password"}
          />
        </label>

        <div className={styles.buttons}>
          <button
            className={clsx(styles.cancel)}
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button className={"button"} disabled={isLoading} type={"submit"}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
        {errors?.password?.type === "required" && (
          <p className={styles.error}>The fields are required</p>
        )}
        {error && <p className={styles.error}>Wrong Password</p>}
      </form>
    </div>
  );
};

export default ModalDeleteImage;
