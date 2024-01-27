import { useReducer } from "react";
import Hero from "./components/Home/Hero";
import Navbar from "./components/Home/Navbar";
import Table from "./components/Home/Table";
import { TaskContext } from "./context";
import { initialState, taskReducer } from "./reducers/TaskReducer";
import Footer from "./components/Home/Footer";

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Hero />
      <Table />
      <Footer />
    </TaskContext.Provider>
  );
}
