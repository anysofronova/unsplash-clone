import styles from "./Header.module.scss";
import Logo from "./Logo/Logo";
import SearchPanel from "./SearchPanel/SearchPanel";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <SearchPanel />
    </header>
  );
};

export default Header;
