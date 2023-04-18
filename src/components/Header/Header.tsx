import clsx from "clsx";
import { useLocation } from "react-router-dom";

import { Logo } from "./Logo";
import { useAuth } from "../../hooks";
import { AddAPhoto } from "./AddAPhoto";
import styles from "./Header.module.scss";
import { LogOut, LogIn } from "./LogInOut";
import { SearchPanel } from "./SearchPanel";

export const Header = () => {
  const auth = useAuth();
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <div className={clsx(styles.item, styles.logo)}>
        <Logo />
      </div>
      <div className={clsx(styles.item, styles.search)}>
        {pathname !== "/login" && <SearchPanel />}
      </div>

      {auth.isAuth && (
        <div className={clsx(styles.item, styles.button)}>
          <AddAPhoto />
        </div>
      )}
      {auth.isAuth ? (
        <div className={clsx(styles.item, styles.auth)}>
          <LogOut />
        </div>
      ) : (
        <div className={clsx(styles.item, styles.auth)}>
          <LogIn />
        </div>
      )}
    </header>
  );
};
