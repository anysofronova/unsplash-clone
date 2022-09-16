import styles from "./SearchPanel.module.scss";
import { Search, Close } from "@styled-icons/evil";
import { useState } from "react";
import clsx from "clsx";

const SearchPanel = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchPanel}>
        <Search className={styles.icon} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder={"Search by name"}
        />
        <Close
          onClick={() => setSearch("")}
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

export default SearchPanel;
