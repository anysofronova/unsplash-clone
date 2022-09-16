import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { IImage } from "../../@types/IImage";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export interface IResponse {
  isAuth: boolean;
  id: string;
}

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery:  fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchImages: builder.query<IImage[], IResponse>({
       queryFn: async({ isAuth, id }) => {
        const q = isAuth
          ? query(collection(db, `users/${id}/photos`))
          : query(collection(db, "general"));
        const photos: IImage[] = [];
        await onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log('doc', doc)
            photos.push({
              label: doc.data().label,
              photoURL: doc.data().photoURL,
              id: doc.id,
            });
          });
        });
        return {
          data: photos
        };
      },
    }),
    addImage: builder.mutation<IImage, IImage>({
      queryFn: async({ id, label, photoURL }) => {
        try {
          await addDoc(collection(db, `users/${id}/photos`), {
            label,
            photoURL,
          });
          return {
            data: "Ok",
          };
        } catch (error: any) {
          console.log(error);
          return error;
        }
      },
    }),
  }),
});
