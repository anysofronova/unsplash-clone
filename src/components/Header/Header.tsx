import styles from "./Header.module.scss";
import Logo from "./Logo/Logo";
import SearchPanel from "./SearchPanel/SearchPanel";
import { useAuth } from "../../hooks/useAuth";
import AddAPhoto from "./AddAPhoto/AddAPhoto";
import LogOut from "./LogInOut/LogOut";
import LogIn from "./LogInOut/LogIn";
import { useLocation } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.item}>
        <Logo />
        {pathname !== "/login" && <SearchPanel />}
      </div>

      {auth.isAuth ? (
        <div className={styles.item}>
          <AddAPhoto />
          <LogOut />
        </div>
      ) : (
        <div className={styles.item}>
          <LogIn />
        </div>
      )}
    </header>
  );
};

export default Header;
