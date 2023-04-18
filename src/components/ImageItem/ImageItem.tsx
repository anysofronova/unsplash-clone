import { FC, SyntheticEvent, useState } from "react";

import { IImage } from "../../@types";
import { useAppSelector } from "../../hooks";
import styles from "./ImageItem.module.scss";
import { ModalDeleteImage } from "../Modals";
import defaultImage from "../../assets/placeholder.webp";

export const ImageItem: FC<IImage> = ({ label, photoURL, id }) => {
  const [modal, setModal] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.authSlice.id);
  const onDeleteImage = () => setModal(true);

  return (
    <>
      {modal && (
        <ModalDeleteImage setModal={setModal} userId={userId} id={id} />
      )}
      <div className={styles.imageItem}>
        <div className={styles.info}>
          {userId && (
            <button onClick={() => onDeleteImage()} className={styles.button}>
              delete
            </button>
          )}
          <p>{label}</p>
        </div>
        <img
          src={photoURL}
          alt={label}
          onError={(event: SyntheticEvent<HTMLImageElement, Event>) => {
            event.currentTarget.src = defaultImage;
            event.currentTarget.onerror = null;
          }}
        />
      </div>
    </>
  );
};
