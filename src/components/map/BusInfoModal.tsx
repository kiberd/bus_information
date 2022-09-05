import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import BusDetailInfo from "./BusDetailInfo";

import { useRecoilState } from "recoil";
import { targetBusDataState } from "../../atoms/data";
import { XIcon } from "@heroicons/react/solid";

interface BusInfoModalProps {
  isBusInfoModalOpen: boolean;
  onHandleBusInfoModal: any;
}

const BusInfoModal: React.FC<BusInfoModalProps> = ({ isBusInfoModalOpen, onHandleBusInfoModal }) => {

  return (
    <>
      <Transition appear show={isBusInfoModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 md:hidden"
          onClose={() => onHandleBusInfoModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-white dark:bg-opacity-20" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white border-black shadow-xl rounded-2xl">
                  <div className="flex justify-end mr-2">
                    <XIcon
                      className="cursor-pointer"
                      width={15}
                      height={15}
                      onClick={() => onHandleBusInfoModal(false)}
                    >
                      close
                    </XIcon>
                  </div>

                  <div className="h-[80vh] overflow-auto overscroll-contain">

				            <BusDetailInfo />

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BusInfoModal;
