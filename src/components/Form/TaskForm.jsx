/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../../context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskForm({
  toggleModal,
  setToggleModal,
  editMode,
  taskToEdit,
}) {
  const { dispatch } = useContext(TaskContext);

  const [newTask, setNewTask] = useState({
    id: null,
    title: "",
    description: "",
    tags: "",
    priority: "",
  });

  const handleClose = () => {
    setToggleModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.dismiss();

    // Validation
    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.tags ||
      !newTask.priority
    ) {
      toast.error("title field are required");
      return;
    }

    if (!newTask.title) {
      toast.error("title field are required");
      return;
    }

    if (!newTask.description) {
      toast.error("description field are required");
      return;
    }

    if (!newTask.tags) {
      toast.error("tags field are required");
      return;
    }

    if (!["low", "medium", "high"].includes(newTask.priority.toLowerCase())) {
      toast.error(
        "Invalid priority value. Please select low, medium, or high."
      );
      return false;
    }

    // Convert tags to an array
    const tagsArray = newTask.tags.split(",").map((tag) => tag.trim());

    if (editMode) {
      // Edit existing task
      dispatch({
        type: "EDIT_TASK",
        payload: { ...taskToEdit, ...newTask, tags: tagsArray },
      });

      // Show success message
      toast.success("Task updated successfully");
    } else {
        
      newTask.id = new Date().getTime();

      // Add new task
      dispatch({
        type: "ADD_TASK",
        payload: { ...newTask, tags: tagsArray },
      });

      // Show success message
      toast.success("New task created successfully");
    }

    // Close the modal
    setToggleModal(false);

    setNewTask({
      id: null,
      title: "",
      description: "",
      tags: "",
      priority: "",
    });
  };

  useEffect(() => {
    // Populate fields when in "edit" mode
    if (editMode && taskToEdit) {
      setNewTask({
        id: taskToEdit.id || null,
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        tags: taskToEdit.tags ? taskToEdit.tags.join(", ") : "", // Convert tags array to a string
        priority: taskToEdit.priority || "",
      });
    }
  }, [editMode, taskToEdit]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 ${
        toggleModal ? "" : "hidden"
      }`}
    >
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Modal */}
      <div className="w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          onClick={handleClose}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          Add New Task
        </h2>

        {/* <!-- inputs --> */}
        <form
          onSubmit={handleSubmit}
          className="space-y-9 text-white lg:space-y-10"
        >
          {/* Title */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              value={newTask.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Tags and Priority */}
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            {/* Tags */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                id="tags"
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                value={newTask.tags}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Priority */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                name="priority"
                id="priority"
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                value={newTask.priority}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-16 flex justify-center lg:mt-20">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Create new Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
