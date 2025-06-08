'use client';

import Modal from '@mui/material/Modal';
import React, {ReactNode} from "react";

type ModalButtonProps = {
  buttonClass?: string | undefined;
  modalClass?: string | undefined;
  buttonTitle: ReactNode;
  modalTitle?: string | undefined;
  modalBody: ReactNode | ((closeModal: () => void) => ReactNode); // Updated this line
  modalContainerClass?: string | undefined;
}

export function ModalButton({ buttonClass, modalClass, buttonTitle, modalTitle, modalBody, modalContainerClass }: ModalButtonProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className={ buttonClass || "" } onClick={handleOpen}>
        { buttonTitle }
      </button>
      <Modal className={ modalClass || "" } open={open} onClose={handleClose}>
        <div
          className={modalContainerClass || "w-[400px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)] border-1 border-[var(--fssgold)] shadow-2xl p-4 text-gray"}
        >
          <h1 className="font-bold text-2xl text-center mt-2">{ modalTitle }</h1>
          <span className="whitespace-pre-wrap">
            {typeof modalBody === 'function' ? modalBody(handleClose) : modalBody}
          </span>
        </div>
      </Modal>
    </div>
  )
}
