import React, { useState, useEffect } from "react";
import EventList from "../components/EventList";
import settingsIcon from "../Assets/settings_icon.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  return (
    <>
      <Helmet>
        <title>Jackpass Show Events</title>
      </Helmet>

      <div className="lg:w-full lg:px-6 lg:py-4 p-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-gray-800">
            Delhi NCR
          </h1>
          <h4>Welcome to the tribe!</h4>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="block w-36 text-black border-2 rounded-full py-2 shadow-md focus:ring-2 focus:ring-blue-500"
          >
            Previous
          </button>
          <img src={settingsIcon} alt="Settings Icon" className="h-8 w-8" />
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4">
        <div className="flex justify-center border-b-2 border-blue-600">
          <h1 className="lg:text-2xl text-lg font-bold text-blue-600 lg:font-semibold lg:mb-2">
            Events
          </h1>
        </div>

        <div className="flex justify-center  border-b-2">
          <h1 className="lg:text-2xl text-gray-500 font-bold lg:font-semibold lg:mb-2">
            Communities
          </h1>
        </div>
      </div>
      <EventList events={events} />
    </div>
    </>
    
  );
};

export default ShowEvents;
