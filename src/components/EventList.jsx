import EventCard from "./EventCard";

// Listing the Events, Here events prop is destructured from the props
// Map (Higher Order Function) is used to map all the events present in the database

const EventList = ({ events }) => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4 gap-2 gap-y-4">
      {events.map((event) => (
        // Event Card component to show the content of each event
        <EventCard key={event.id || event.title} event={event} />
      ))}
    </div>
  );
};

export default EventList;
