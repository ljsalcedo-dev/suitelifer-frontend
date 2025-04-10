import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
  } from "@headlessui/react";
  import React, { Fragment } from "react";
  
  export const ModalDeleteConfirmation = ({
    isOpen,
    handleClose,
    onConfirm,
    message = "Are you sure you want to delete this?",
  }) => {
    const handleDelete = async () => {
      handleClose();
      if (onConfirm) {
        await onConfirm();
      }
    };
  
    const handleCancel = () => {
      handleClose();
    };
  
    return (
      <Transition appear show={isOpen} as={Fragment} className="z-40">
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <TransitionChild as={Fragment}>
            <div className="fixed inset-0 bg-black opacity-40" />
          </TransitionChild>
  
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Deletion
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-red-600 hover:bg-red-700 transition"
                      onClick={handleDelete}
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200 transition"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };
  