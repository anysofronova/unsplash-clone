import styles from "./Panel.module.scss";
import { FC } from "react";

export interface IPanel {
  title: string;
  subTitle: string;
  buttonText: string;
  onButton: () => void;
}
const Panel: FC<IPanel> = ({ title, subTitle, buttonText, onButton }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{subTitle}</p>
      <button className={styles.ghost} onClick={() => onButton()}>
        {buttonText}
      </button>
    </>
  );
};

export default Panel;
