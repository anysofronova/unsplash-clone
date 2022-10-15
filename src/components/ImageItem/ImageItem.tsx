import { FC, SyntheticEvent, useState } from "react";
import defaultImage from "../../assets/placeholder.webp";

import styles from "./ImageItem.module.scss";
import { IImage } from "../../@types/IImage";
import { useAppSelector } from "../../hooks/redux";
import ModalDeleteImage from "../Modals/ModalDeleteImage/ModalDeleteImage";

const ImageItem: FC<IImage> = ({ label, photoURL, id }) => {
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

export default ImageItem;
