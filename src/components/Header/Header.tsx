import styles from "./Header.module.scss";
import Logo from "./Logo/Logo";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
};

export default Header;
