import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import clsx from "clsx";

import { useAppDispatch } from "../../hooks/redux";
import styles from "./Login.module.scss";
import Form from "../../components/Login/Form/Form";
import Panel from "../../components/Login/Panel/Panel";
import { InputsType } from "../../@types/InputsType";
import { setUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mode, setMode] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const onSetMode = () => setMode(!mode);
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
      <div className={clsx(styles.container, mode && styles.rightPanelActive)}>
        <div className={clsx(styles.formContainer, styles.signUpContainer)}>
          <Form
            title={"Create Account"}
            subTitle={"or use your email for registration"}
            isSignUp={true}
            buttonText={"Sign Up"}
            singInAndUp={singInAndUp}
          />
        </div>
        <div className={clsx(styles.formContainer, styles.signInContainer)}>
          <Form
            title={"Sign in"}
            subTitle={"or use your account"}
            isSignUp={false}
            buttonText={"Sign in"}
            singInAndUp={singInAndUp}
            error={error}
          />
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={clsx(styles.panel, styles.left)}>
              <Panel
                title={"Welcome Back!"}
                subTitle={
                  "To keep connected with us please login with your personal info"
                }
                buttonText={" Sign In"}
                onButton={onSetMode}
              />
            </div>
            <div className={clsx(styles.panel, styles.right)}>
              <Panel
                title={"Hello, Friend!"}
                subTitle={
                  "Enter your personal details and start journey with us"
                }
                buttonText={"  Sign Up"}
                onButton={onSetMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
