import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEvent from "./pages/AddEvent";
import ShowEvents from "./pages/ShowEvents";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddEvent />} />
        <Route path="/events" element={<ShowEvents />} />
      </Routes>
    </Router>
  );
};

export default App;
