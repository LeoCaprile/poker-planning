import React from "react";
import VoteCard from "../../../User/UserControls/DevControls/VoteCard";
import styles from "./EstimationCard.module.css";
import classNames from "classnames";

type Props = {
  name: string;
  value: number;
  show: boolean;
  justify: boolean;
};

const EstimationCard = ({ name, value, show, justify }: Props) => {
  return (
    <div className="flex flex-col items-center justify-end text-center ">
      <strong className="text-xl mb-2 text-ellipsis w-24 overflow-hidden">
        {name}
      </strong>
      <div className="indicator">
        {justify && (
          <span className="indicator-item badge-lg rounded-2xl badge-accent">
            Justify
          </span>
        )}
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
    </div>
  );
};

export default EstimationCard;
