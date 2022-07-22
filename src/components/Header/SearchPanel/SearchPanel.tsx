import styles from "./SearchPanel.module.scss";
import { Search, Close } from "@styled-icons/evil";
import { useState } from "react";
import clsx from "clsx";

const SearchPanel = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className={styles.searchPanel}>
      <Search className={styles.icon} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      {search.length > 0 && (
        <Close
          onClick={() => setSearch("")}
          className={clsx(styles.icon, styles.close)}
        />
      )}
    </div>
  );
};

export default SearchPanel;
