import styles from "./Header.module.scss";
import Logo from "./Logo/Logo";
import SearchPanel from "./SearchPanel/SearchPanel";
import { useAuth } from "../../hooks/useAuth";
import AddAPhoto from "./AddAPhoto/AddAPhoto";

const Header = () => {
  const auth = useAuth();
  return (
    <header className={styles.header}>
      <div className={styles.item}>
        <Logo />
        <SearchPanel />
      </div>

      {auth.isAuth ? (
        <div className={styles.item}>
          <AddAPhoto /> {/* Will be LogOut */}
        </div>
      ) : (
        <div className={styles.item}>{/* Will be LogIn */}</div>
      )}
    </header>
  );
};

export default Header;
