import React from "react";

type Props = {
  value: string | number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selected?: boolean;
};

const VoteCard = ({ value, onClick, selected }: Props) => {
  return (
    <button
      onClick={onClick}
      value={value}
      className={`btn w-20 h-32 text-3xl rounded-md ${
        selected ? "btn-accent" : "btn-default"
      }`}
    >
      {value}
    </button>
  );
};

export default VoteCard;
