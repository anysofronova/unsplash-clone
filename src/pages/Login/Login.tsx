import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { Form } from "../../components";
import styles from "./Login.module.scss";
import { InputsType } from "../../@types";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../redux/slices/authSlice";

export const Login = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const onSetMode = (val: boolean): void => setIsSignUp(val);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const singInAndUp = ({ email, password, name }: InputsType) => {
    const auth = getAuth();
    if (name) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result: any) => {
          const { user } = result;
          updateProfile(user.auth.currentUser, {
            displayName: name,
          }).then(() => {
            dispatch(
              setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                name,
              })
            );
            setError("");
            navigate("/home");
          });
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((result: any) => {
          const { user } = result;
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.accessToken,
              name: user.displayName,
            })
          );
          setError("");
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
        });
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        {isSignUp && (
          <div className={styles.formContainer}>
            <Form
              title={"Create Your Account"}
              subTitle={"or use your email for registration"}
              isSignUp={isSignUp}
              onSetMode={onSetMode}
              singInAndUp={singInAndUp}
              error={error}
            />
          </div>
        )}
        {!isSignUp && (
          <div className={styles.formContainer}>
            <Form
              title={"Sign in"}
              subTitle={"or use your account"}
              isSignUp={isSignUp}
              onSetMode={onSetMode}
              singInAndUp={singInAndUp}
              error={error}
            />
          </div>
        )}
      </div>
    </div>
  );
};
