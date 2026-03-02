import { useEffect, useState } from "react";
import "./App.css";
import DisplayList from "./components/DisplayList";
import TodoCard from './components/TodoCard'


function App() {
 return(
 <div className="w-screen">
 <DisplayList />
 </div>)
}

export default App;