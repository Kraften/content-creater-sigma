import { useState } from "react";

import styles from "./List-Answers.module.scss";
import postStore from "../../../store/postStore";

const ListAnswers = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { listOfPerks, updateSelectedPerksList } = postStore();

  const handleSelectItem = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.bulletPoint === item.bulletPoint
    );

    let updatedItems;
    if (isSelected) {
      updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem.bulletPoint !== item.bulletPoint
      );
    } else {
      updatedItems = [...selectedItems, item];
    }

    setSelectedItems(updatedItems);
    updateSelectedPerksList(updatedItems);
  };

  return (
    <ul className={styles.list}>
      {listOfPerks?.map((item, i) => {
        return (
          <li
            onClick={() => handleSelectItem(item)}
            key={i}
            className={styles.listItem}
            style={{
              cursor: "pointer",
              backgroundColor: selectedItems.some(
                (selectedItem) => selectedItem.bulletPoint === item.bulletPoint
              )
                ? "#D3E4CD"
                : "white",
            }}
          >
            <p className={styles.liHeader}>{item.header}</p>
            <p className={styles.liBulletPoint}>{item.bulletPoint}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ListAnswers;
