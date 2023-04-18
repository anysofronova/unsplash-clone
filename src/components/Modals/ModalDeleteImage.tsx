import { FC, useState } from "react";
import clsx from "clsx";
import { deleteDoc, doc } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";

import { db } from "../../firebase";
import { ModalDeleteType } from "../../@types";
import styles from "./ModalAddImage.module.scss";

type TInput = { password: string };

export const ModalDeleteImage: FC<ModalDeleteType> = ({
  setModal,
  userId,
  id,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const checkAPassword: SubmitHandler<TInput> = async () => {
    setIsLoading(true);
    await deleteDoc(doc(db, `users/${userId}/photos`, id)).then(() =>
      setIsLoading(false)
    );
  };
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>();
  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={handleSubmit(checkAPassword)}>
        <h2>Are you sure?</h2>
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
      </form>
    </div>
  );
};
