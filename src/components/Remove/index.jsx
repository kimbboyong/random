import React from "react";
import { getDatabase, ref, remove } from "firebase/database";
const Remove = () => {
  const handleReset = () => {
    const db = getDatabase();

    const reference = ref(db, "/yutnoriResults");

    remove(reference)
      .then(() => {
        console.log("Data removed successfully");
      })
      .catch((error) => {
        console.error("Failed to remove data", error);
      });
  };
  return <button onClick={handleReset}>Reset</button>;
};

export default Remove;
