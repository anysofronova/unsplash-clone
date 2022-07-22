import Socials from "../Socials/Socials";
import styles from "./Form.module.scss";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IForm } from "../../@types/IForm";
import { InputsType } from "../../@types/InputsType";

const Form: FC<IForm> = ({
  title,
  subTitle,
  isSignUp,
  buttonText,
  singInAndUp,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();
  const onSign: SubmitHandler<InputsType> = (data) => singInAndUp(data);
  return (
    <form onSubmit={handleSubmit(onSign)} className={styles.form}>
      <h2>{title}</h2>
      <Socials />
      <span>{subTitle}</span>
      {isSignUp && (
        <input
          {...register("name", {
            required: true,
            pattern: /[a-zA-zа-яА-Я]/gi,
            maxLength: 30,
          })}
          placeholder={"Name"}
        />
      )}
      <input
        {...register("email", {
          required: true,
          pattern: /^\S+@\S+\.\S+$/gi,
        })}
        placeholder={"Email"}
      />
      <input
        {...register("password", {
          required: true,
          minLength: isSignUp ? 8 : undefined,
          maxLength: isSignUp ? 20 : undefined,
        })}
        placeholder={"Password"}
        type={"password"}
      />
      <button className={"button"}>{buttonText}</button>
      <div className={styles.errors}>
        {isSignUp && errors?.name?.type === "maxLength" && (
          <p>Name cannot exceed 30 characters</p>
        )}
        {isSignUp &&
          (errors?.password?.type === "minLength" ||
            errors?.password?.type === "maxLength") && (
            <p>
              The password cannot be shorter than 8 characters or longer than 20
              characters.
            </p>
          )}
        {errors?.email?.type === "pattern" && <p>Please enter a valid Email</p>}
        {(errors?.name?.type === "required" ||
          errors?.email?.type === "required" ||
          errors?.password?.type === "required") && (
          <p>The fields are required</p>
        )}
      </div>
    </form>
  );
};

export default Form;
