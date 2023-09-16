import React from "react";
import VoteCard from "../VoteCard";
import styles from "./TableCard.module.css";
import classNames from "classnames";

type Props = {
  name: string;
  value: number;
  show: boolean;
};

const TableCard = ({ name, value, show }: Props) => {
  return (
    <div className="flex flex-col items-center poto">
      <strong className="text-2xl">{name}</strong>
      <div
        className={show ? classNames(styles.card, styles.show) : styles.card}
      >
        <div className={styles.backCard}>
          <div className="w-20 h-32" />
        </div>
        <div className={styles.frontCard}>
          <VoteCard value={value} />
        </div>
      </div>
    </div>
  );
};

export default TableCard;
