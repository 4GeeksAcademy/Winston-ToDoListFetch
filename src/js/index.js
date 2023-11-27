//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";


import "../styles/index.css";

//import your own components
// import Home from "./component/home.jsx";
import Lista from "./component/todos.jsx";

//render your react application
ReactDOM.render(<Lista />, document.querySelector("#app"));
