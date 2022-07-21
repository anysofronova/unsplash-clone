import { InputsType } from "./InputsType";

export interface IForm {
  title: string;
  subTitle: string;
  isSignUp: boolean;
  buttonText: string;
  singInAndUp: (params: InputsType) => void;
}
