import React, { useState, useEffect } from "react";
import EventList from "../components/EventList";
import settingsIcon from "../Assets/settings_icon.png";
import MetaData from "../utils/MetaData";

const ShowEvents = () => {

  // event state used to store the events data
  const [events, setEvents] = useState([]);

  // tabIndex state to conditionally render events and communities
  const [tabIndex,setTabIndex] = useState(1);


  // useEffect is hook used to get the events data from the local storage
  // Dependency Array is empty, it will run only once for the initial render 
  
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  return (
    <>
      {/*MetaData Componet used to set the title of the page*/}
      <MetaData title="Jackpass Show Events"/> 

      <div className="lg:w-full lg:px-6 lg:py-2 p-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="lg:text-2xl text-xl  font-semibold lg:mb-2 text-gray-800">
              Delhi NCR
            </h1>
            <h4>Welcome to the tribe!</h4>
          </div>
         
          <img src={settingsIcon} alt="Settings Icon" className="h-8 w-8" />
        </div>

      <div className="grid grid-cols-2 mt-4">
        <div className={`flex justify-center border-b-2 ${tabIndex === 1 ? " border-blue-600" : " border-gray-300"}`} onClick={()=>{setTabIndex(1)}}>
            <h1 className={`lg:text-2xl text-lg font-bold lg:font-semibold lg:mb-2 ${tabIndex === 1 ? "text-blue-600" : "text-gray-500"}`}>
            Events
          </h1>
        </div>

        <div className={`flex justify-center border-b-2 ${tabIndex === 2 ? " border-blue-600" : " border-gray-300"}`} onClick={()=>{setTabIndex(2)}}>
          <h1 className={`lg:text-2xl text-lg font-bold lg:font-semibold lg:mb-2 ${tabIndex === 2 ? "text-blue-600" : "text-gray-500"}`}>
            Communities
          </h1>
        </div>
      </div>

      {/* Conditional Rendering of the Events and Communities*/}
      {
        tabIndex === 1 &&  
        // Event List component where events is passed as a prop
        <EventList events={events} />
      }
      {
        tabIndex === 2 &&  <div className="flex justify-center items-center h-96">"No community Present"</div>
      }
      
    </div>
    </>
    
  );
};

export default ShowEvents;
