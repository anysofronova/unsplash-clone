import styles from "./SearchPanel.module.scss";
import { Search, Close } from "@styled-icons/evil";
import { useState } from "react";

const SearchPanel = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className={styles.searchPanel}>
      <div>
        <Search />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      {search.length > 0 && (
        <div>
          <Close onClick={() => setSearch("")} />
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
