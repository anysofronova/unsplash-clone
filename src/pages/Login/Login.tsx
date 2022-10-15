import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAppDispatch } from "../../hooks/redux";
import styles from "./Login.module.scss";
import Form from "../../components/Login/Form/Form";
import { InputsType } from "../../@types/InputsType";
import { setUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
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
            navigate("/home");
          });
        })
        .catch((error) => console.log(error));
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
          setError(false);
          navigate("/home");
        })
        .catch(() => setError(true));
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.choose}>
          <div
            className={clsx(styles.option, !isSignUp && styles.active)}
            onClick={() => onSetMode(false)}
          >
            <span>Sign In</span>
          </div>
          <div
            className={clsx(styles.option, isSignUp && styles.active)}
            onClick={() => onSetMode(true)}
          >
            <span>Sign Up</span>
          </div>
        </div>
        {isSignUp && (
          <div className={styles.formContainer}>
            <Form
              title={"Create Your Account"}
              subTitle={"or use your email for registration"}
              isSignUp={isSignUp}
              onSetMode={onSetMode}
              singInAndUp={singInAndUp}
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

export default Login;
