import styles from "./Modal.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";
import clsx from "clsx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux";
import { IImage } from "../../@types/IImage";
import { ModalType } from "../../@types/ModalType";
import { v4 as uuidv4 } from "uuid";

const Modal: FC<ModalType> = ({ setModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IImage>();
  const { id } = useAppSelector((state) => state.authSlice);
  const onAddPhoto: SubmitHandler<IImage> = async (data) => {
    await addDoc(collection(db, `users/${id}/photos`), {
      id: uuidv4(),
      label: data.label,
      photoURL: data.photoURL,
    });
    setModal(false);
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(onAddPhoto)} className={styles.form}>
        <h2>Add a new photo</h2>
        <label>
          <p>Label</p>
          <input
            {...register("label", {
              required: true,
              maxLength: 30,
            })}
            placeholder={"Label"}
          />
        </label>

        <label>
          <p>Photo URL</p>
          <input
            {...register("photoURL", {
              required: true,
              pattern: /^https?:\/\/.*\/.*\??.*$/gim,
            })}
            placeholder={"Photo URL"}
          />
        </label>

        <div className={styles.buttons}>
          <button
            className={clsx(styles.cancel)}
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button className={"button"}>Submit</button>
        </div>

        <div className={styles.errors}>
          {errors?.label?.type === "maxLength" && (
            <p className={styles.error}>Label cannot exceed 30 characters</p>
          )}
          {errors?.photoURL?.type === "pattern" && (
            <p className={styles.error}>Invalid Photo URL</p>
          )}
          {(errors?.label?.type === "required" ||
            errors?.photoURL?.type === "required") && (
            <p>The fields are required</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Modal;
