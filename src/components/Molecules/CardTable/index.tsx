import React from "react";
import style from "./cardvote.module.css";
const CardTable = () => {
  return (
    <div className="grid place-content-center">
      <div className="h-96 w-96 bg-amber-300 rounded-full relative">
        <div className={style.cardVote2} />
        <div className={style.cardVote2} />
      </div>
    </div>
  );
};

export default CardTable;
