import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "../../firebase";
import { useAuth } from "../../hooks";
import { IImage } from "../../@types";
import styles from "./Home.module.scss";
import { useAppSelector } from "../../hooks";
import { ImageItem, NoResults, Loader } from "../../components";

export const Home = () => {
  const [data, setData] = useState<IImage[] | null>(null);
  const [filterData, setFilterData] = useState<IImage[] | null>(null);
  const { isAuth } = useAuth();
  const { id } = useAppSelector((state) => state.authSlice);
  const { search } = useAppSelector((state) => state.searchSlice);

  useEffect(() => {
    const colRef = isAuth
      ? query(collection(db, `users/${id}/photos`))
      : query(collection(db, "general"));
    onSnapshot(colRef, (snapshot) => {
      const photos: IImage[] = [];
      snapshot.forEach((doc) => {
        photos.push({
          label: doc.data().label,
          photoURL: doc.data().photoURL,
          id: doc.id,
        });
      });
      setData(photos);
    });
  }, []);

  useEffect(() => {
    setFilterData(
      data?.filter(
        (i) => i.label.toUpperCase().indexOf(search.toUpperCase()) !== -1
      ) || null
    );
  }, [data, search]);
  const breakpointColumns = {
    default: 7,
    1440: 6,
    1024: 5,
    920: 4,
    768: 3,
    350: 2,
  };
  return (
    <section className={styles.home}>
      {filterData === null && <Loader />}
      {filterData?.length === 0 && <NoResults isNoResults={true} />}
      {filterData && (
        <Masonry
          breakpointCols={breakpointColumns}
          className="myMasonryGrid"
          columnClassName="myMasonryGridColumn"
        >
          {filterData.map((i: IImage) => (
            <ImageItem
              id={i.id}
              photoURL={i.photoURL}
              label={i.label}
              key={i.id}
            />
          ))}
        </Masonry>
      )}
    </section>
  );
};
