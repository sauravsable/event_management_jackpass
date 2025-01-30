import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events }) => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4 gap-2">
      {events.map((event) => (
        <EventCard key={event.id || event.title} event={event} />
      ))}
    </div>
  );
};

export default EventList;
