import { Google } from "@styled-icons/boxicons-logos";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import styles from "./Socials.module.scss";
import { setUser } from "../../../redux/slices/authSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";

const Socials = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onUpdate = (result: any) => {
    const { user } = result;
    dispatch(
      setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        name: user.displayName,
      })
    );
    updateProfile(user.auth.currentUser, {
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
    }).then(() => navigate("/home"));
  };
  const onGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result: any) => onUpdate(result))
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.socialContainer}>
      <div className={styles.social} onClick={onGoogle}>
        <Google />
      </div>
    </div>
  );
};

export default Socials;
