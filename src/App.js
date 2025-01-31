// EJS is used in React by default so we are using import and export default

import { ToastContainer } from "react-toastify";
// default react toast css
import "react-toastify/dist/ReactToastify.css";

// React Router DOM 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// These are exported default so no need to destructer it
import AddEvent from "./pages/AddEvent";
import ShowEvents from "./pages/ShowEvents";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Router>
      {/*All the react router dom functions and methods can only be access by those which are present inside Router */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add-events" element={<AddEvent/>} />
        <Route path="/events" element={<ShowEvents />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
