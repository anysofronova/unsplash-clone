import { useAuth } from "../../hooks/useAuth";
import styles from "./Home.module.scss";
import { useAppSelector } from "../../hooks/redux";
import ImageItem from "../../components/ImageItem/ImageItem";
import Masonry from "react-masonry-css";
import { IImage } from "../../@types/IImage";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";

const Home = () => {
  const { isAuth } = useAuth();
  const { id } = useAppSelector((state) => state.authSlice);
  const [data, setData] = useState<IImage[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(data);
  useEffect(() => {
    setIsLoading(true);
    const photos: IImage[] = [];
    const fetchData = async () => {
      const q = isAuth
        ? query(collection(db, `users/${id}/photos`))
        : query(collection(db, "general"));
      await onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          photos.push({
            label: doc.data().label,
            photoURL: doc.data().photoURL,
            id: doc.id,
          });
        });
        setData(photos);
      });
    };
    fetchData().then(() => setIsLoading(false));
  }, [id, isAuth]);

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
      {(isLoading || data === null) && <Loader />}
      {data?.length === 0 && <div>NO RESULTS</div>}
      {data && (
        <Masonry
          breakpointCols={breakpointColumns}
          className="myMasonryGrid"
          columnClassName="myMasonryGridColumn"
        >
          {data &&
            data.length > 0 &&
            data.map((i: IImage) => (
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

export default Home;
