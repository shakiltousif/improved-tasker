const initialState = {
  tasks: [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      tags: ["tag1"],
      priority: "high",
      favorite: false,
    },
  ],
  searchTerm: ""
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, favorite: !task.favorite }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "EDIT_TASK": {
      // Use curly braces to create a block scope for lexical declarations
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          // Update the matching task with the new details
          return { ...task, ...action.payload };
        }
        return task;
      });
      return { ...state, tasks: updatedTasks };
    }
    case "DELETE_ALL":
      return {
        ...state,
        tasks: [],
      };

    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export { initialState, taskReducer };
// export const TaskProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(taskReducer, initialState);

//   return (
//     <TaskContext.Provider value={{ state, dispatch }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   return useContext(TaskContext);
// };
