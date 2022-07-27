import { doc, deleteDoc } from "firebase/firestore";
import { FC } from "react";
import { Close } from "@styled-icons/evil";

import styles from "./ImageItem.module.scss";
import { IImage } from "../../@types/IImage";
import { db } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux";

const ImageItem: FC<IImage> = ({ label, photoURL, id }) => {
  const userId = useAppSelector((state) => state.authSlice.id);
  const onDeleteImage = async () =>
    await deleteDoc(doc(db, `users/${userId}/photos`, id));
  return (
    <div className={styles.imageItem}>
      <img src={photoURL} alt={label} />
      {userId && (
        <button onClick={() => onDeleteImage()} className={styles.button}>
          <Close />
        </button>
      )}
    </div>
  );
};

export default ImageItem;
