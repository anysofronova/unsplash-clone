import clsx from "clsx";
import { Search, Close } from "@styled-icons/ionicons-outline";

import styles from "./SearchPanel.module.scss";
import { setSearch } from "../../../redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";

export const SearchPanel = () => {
  const { search } = useAppSelector((state) => state.searchSlice);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchPanel}>
        <Search className={styles.icon} />
        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(setSearch(e.currentTarget.value))}
          placeholder={"Search by name"}
        />
        <Close
          onClick={() => dispatch(setSearch(""))}
          className={clsx(
            styles.icon,
            styles.close,
            search.length > 0 && styles.active
          )}
        />
      </div>
    </div>
  );
};
