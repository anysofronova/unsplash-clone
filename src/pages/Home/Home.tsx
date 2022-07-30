import { useAuth } from "../../hooks/useAuth";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux";
import { IImage } from "../../@types/IImage";
import ImageItem from "../../components/ImageItem/ImageItem";
import Masonry from "react-masonry-css";

const Home = () => {
  const auth = useAuth();
  const [date, setDate] = useState<IImage[]>([]);
  const { id } = useAppSelector((state) => state.authSlice);
  const breakpointColumns = {
    default: 4,
    1024: 4,
    768: 3,
    480: 3,
    350: 2,
  };
  useEffect(() => {
    let q;
    if (auth.isAuth) q = query(collection(db, `users/${id}/photos`));
    else q = query(collection(db, "general"));
    onSnapshot(q, (querySnapshot) => {
      const photos: IImage[] = [];
      querySnapshot.forEach((doc) =>
        photos.unshift({
          label: doc.data().label,
          photoURL: doc.data().photoURL,
          id: doc.id,
        })
      );
      setDate(photos);
    });
  }, [id, auth.isAuth]);

  return (
    <section className={styles.home}>
      {date.length === 0 && <div>Sorry</div>}
      <Masonry
        breakpointCols={breakpointColumns}
        className="myMasonryGrid"
        columnClassName="myMasonryGridColumn"
      >
        {date.length > 0 &&
          date.map((i) => (
            <ImageItem
              id={i.id}
              photoURL={i.photoURL}
              label={i.label}
              key={i.id}
            />
          ))}
      </Masonry>
    </section>
  );
};

export default Home;
