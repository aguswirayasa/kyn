import React from "react";

const DeleteModal = ({
  onClick,
  showModal,
  apiCall,
  id,
  closeModal,
  username,
}) => {
  return (
    <>
      <button
        onClick={() => onClick()}
        className="bg-red-500 p-2 rounded-sm font-bold uppercase drop-shadow-md"
      >
        delete
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex  fixed inset-0 z-50 text-secondary">
            <div className="relative  my-6 mx-auto h-4/5 w-2/5 overflow-y-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete User</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    <span className=" text-secondary  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 grid  gap-3">
                  <p className="text-base font-medium">
                    Are you sure want to delete this user "{username}"?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => apiCall(id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => closeModal()}
                      className="px-5 py-2 bg-accent text-white rounded-md"
                    >
                      Back
                    </button>
                  </div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default DeleteModal;
