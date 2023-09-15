import React, { PropsWithChildren } from "react";

type Props = {
  open: boolean;
  title: string;
};

const Modal = ({ open, title, children }: PropsWithChildren<Props>) => {
  return (
    <dialog open={open} className="modal bg-[#00000060] ">
      <div className="modal-box">
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold text-3xl text-center"> {title} </h2>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
