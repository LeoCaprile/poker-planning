import { PropsWithChildren } from "react";

type Props = {
  title?: string;
};
const Card = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        {title && <h2 className="card-title"> {title} </h2>}
        <ul className="flex flex-col gap-5">{children}</ul>
      </div>
    </div>
  );
};

export default Card;
