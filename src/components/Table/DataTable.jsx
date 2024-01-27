import { useContext, useState } from "react";
import { TaskContext } from "../../context";
import TaskForm from "../Form/TaskForm";
import { toast } from "react-toastify";

const getRandomColor = () => {
  const storedColors = JSON.parse(localStorage.getItem("tagColors")) || {};

  const colors = [
    "#00D991A1",
    "#FF5733A1",
    "#3399FFA1",
    "#FFC300A1",
    "#C70039A1",
  ];

  return (tag) => {
    if (storedColors[tag]) {
      return storedColors[tag];
    } else {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      storedColors[tag] = randomColor;
      localStorage.setItem("tagColors", JSON.stringify(storedColors));
      return randomColor;
    }
  };
};

export default function DataTable() {
  const { state, dispatch } = useContext(TaskContext);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [editDetails, setEditDetails] = useState(false);

  const deleteTask = (task) => {
    dispatch({ type: "DELETE_TASK", payload: task?.id });
    // Display a confirmation prompt
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${task?.title}?`
    );

    // If the user confirms, proceed with deletion
    if (isConfirmed) {
      dispatch({ type: "DELETE_TASK", payload: task?.id });
      toast.success(`${task?.title} deleted successfully!`);
    } else {
      toast.warning("Deletion cancelled by user.");
    }
  };

  const toggleFavorite = (taskId) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: taskId });
  };

  const openEditModal = (task) => {
    setOpenTaskModal(true);
    setEditDetails(task);
  };

  return (
    <>
      <table className="table-fixed overflow-auto xl:w-full">
        <thead>
          <tr>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
              Title
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
              Description
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
              Tags
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              Priority
            </th>
            <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {state.tasks?.length != 0
            ? state.tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
                >
                  <td>
                    <p
                      onClick={() => toggleFavorite(task?.id)}
                      className="cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-star"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="yellow"
                        fill={task?.favorite ? "yellow" : "none"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                      </svg>
                    </p>
                  </td>
                  <td>{task.title}</td>
                  <td>
                    <div>{task.description}</div>
                  </td>
                  <td>
                    <ul className="flex justify-center gap-1.5 flex-wrap">
                      {task.tags.map((tag, tagKey) => (
                        <li key={tagKey}>
                          <span
                            className={`inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]`}
                            style={{ backgroundColor: getRandomColor()(tag) }}
                          >
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="text-center">{task.priority}</td>
                  <td>
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        className="text-red-500"
                        onClick={() => deleteTask(task)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-blue-500"
                        onClick={() => openEditModal(task)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            : state.tasks?.length == 0 && (
                <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
                  <td colSpan={6} className="text-center">
                    Task List is empty!
                  </td>
                </tr>
              )}
        </tbody>
      </table>

      <div>
        <TaskForm
          toggleModal={openTaskModal}
          setToggleModal={setOpenTaskModal}
          editMode={true}
          taskToEdit={editDetails}
        />
      </div>
    </>
  );
}
