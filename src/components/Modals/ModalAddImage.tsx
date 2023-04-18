import { FC, useState } from "react";
import clsx from "clsx";
import { addDoc, collection } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";

import { db } from "../../firebase";
import { useAppSelector } from "../../hooks";
import styles from "./ModalAddImage.module.scss";
import { IImage, ModalAddType } from "../../@types";

export const ModalAddImage: FC<ModalAddType> = ({ setModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IImage>();
  const { id } = useAppSelector((state) => state.authSlice);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onAddPhoto: SubmitHandler<IImage> = async (data) => {
    setIsLoading(true);
    await addDoc(collection(db, `users/${id}/photos`), {
      label: data.label,
      photoURL: data.photoURL,
    });
    setModal(false);
    setIsLoading(false);
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
            required
            placeholder={"People Images & Pictures"}
          />
        </label>

        <label>
          <p>Photo URL</p>
          <input
            {...register("photoURL", {
              required: true,
              pattern: /^https?:\/\/.*\/.*\??.*$/gim,
            })}
            required
            placeholder={"https://images.unsplash.com/photo-1558967333..."}
          />
        </label>

        <div className={styles.buttons}>
          <button
            className={clsx(styles.cancel)}
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button className={"button"} disabled={isLoading}>
            Submit
          </button>
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
