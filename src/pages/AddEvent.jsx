import React from "react";
import { Helmet } from "react-helmet";
import EventForm from "../components/EventForm";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Jackpass Add Event</title>
      </Helmet>

      <div className="lg:px-6 lg:pt-4 lg:pb-6">
        <div className="flex justify-end mt-2 mr-2">
            <button
              onClick={() => {
                navigate("/events");
              }}
              className="block w-36 bg-blue-600 text-white rounded-full py-2 shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Events
            </button>
        </div>
        <EventForm />
      </div>
    </>
  );
};

export default AddEvent;
