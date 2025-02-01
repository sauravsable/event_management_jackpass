import React, { useState, useEffect } from "react";
import EventList from "../components/EventList";
import settingsIcon from "../Assets/settings_icon.png";
import MetaData from "../utils/MetaData";
import Communities from "../components/Communities";

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

  const tabs = [
    {
      tabIndex: 1,
      tabName : "Events",
      tabComponent : <EventList events={events} />
    },
    {
      tabIndex: 2,
      tabName : "Communities",
      tabComponent : <Communities/> 
    }
  ]

 

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

      <div className={`grid ${tabs.length === 2 ? "grid-cols-2" : tabs.length === 3 ? "grid-cols-3" : "grid-cols-4"} mt-4`}>
        {
          tabs.map((tab) => (
            <div key={tab.tabIndex} className={`flex cursor-pointer justify-center border-b-2 ${tabIndex === tab.tabIndex ? " border-blue-600" : " border-gray-300"}`} onClick={()=>{setTabIndex(tab.tabIndex)}}>
              <h1 className={`lg:text-2xl text-lg font-bold lg:font-semibold lg:mb-2 ${tabIndex === tab.tabIndex ? "text-blue-600" : "text-gray-500"}`}>
                {tab.tabName}
              </h1>
            </div>
          ))
        }
      </div>

      {/* Conditional Rendering of the Events and Communities*/}
      <div className="mt-4">
        {tabs.find((tab) => tab.tabIndex === tabIndex)?.tabComponent || (
          <div className="flex justify-center items-center h-96">
            No Content Available
          </div>
        )}
      </div>
      
    </div>
    </>
    
  );
};

export default ShowEvents;
