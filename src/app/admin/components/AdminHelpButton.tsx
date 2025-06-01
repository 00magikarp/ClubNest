import {ModalButton} from "@/app/components/ModalButton";
import * as React from "react";

export function AdminHelpButton() {
  return (
    <ModalButton
      buttonClass="p-2 flex items-center justify-center h-[75px] w-full text-lg !text-[var(--fssgold)] rounded-md select-text
      bg-[var(--container)] justify-around transform transition-transform duration-200 hover:scale-102 cursor-pointer border border-1 border-[var(--fssgold)]
      "
      modalClass=""
      buttonTitle={
        <h3>
          Need help?
        </h3>
      }
      modalTitle={"Admin Help"}
      modalContainerClass="
      w-[80vw] h-[70vh] min-w-[250px] min-h-[525px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bars)]
      border-2 border-[var(--fssgold)] shadow-2xl p-4 text-gray overflow-y-auto"
      modalBody={
        <>
          <p className="w-0 h-5 "></p>
        </>
      }
    />
  )
}