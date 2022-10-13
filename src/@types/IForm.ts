import { InputsType } from "./InputsType";

export interface IForm {
  title: string;
  subTitle: string;
  isSignUp: boolean;
  onSetMode: (val: boolean) => void;
  singInAndUp: (params: InputsType) => void;
  error?: boolean;
}
