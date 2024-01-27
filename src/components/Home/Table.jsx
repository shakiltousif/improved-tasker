import { useContext, useState } from "react";
import TaskForm from "../Form/TaskForm";
import DataTable from "../Table/DataTable";
import { ToastContainer, toast } from "react-toastify";
import { TaskContext } from "../../context";

export default function Table() {
  const { dispatch } = useContext(TaskContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const deleteAllTasks = () => {
    // Display a confirmation prompt
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    // If the user confirms, proceed with deletion
    if (isConfirmed) {
      dispatch({ type: "DELETE_ALL" });
      toast.success("All tasks deleted successfully!");
    } else {
      toast.warning("Deletion cancelled by user.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
  };

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <div className="flex items-center space-x-5">
              <form onClick={handleSubmit}>
                <div className="flex">
                  <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                    <input
                      type="search"
                      id="search-dropdown"
                      className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
                      placeholder="Search Task"
                      required
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
                    >
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </form>
              <button
                onClick={() => setOpenTaskModal(true)}
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
              >
                Add Task
              </button>
              <button
                onClick={() => deleteAllTasks()}
                className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
              >
                Delete All
              </button>
            </div>
          </div>
          <div className="overflow-auto">
            <DataTable />
          </div>
          <div>
            <TaskForm
              toggleModal={openTaskModal}
              setToggleModal={setOpenTaskModal}
            />
          </div>
        </div>
      </div>

      {/* Toast container for displaying messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
}
