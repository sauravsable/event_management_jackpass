import React from "react";
import clockImage from "../Assets/stopwatch.png";
import locationImage from "../Assets/location.png";

const EventCard = ({ event }) => {
  const { media, community, title, startDate, location } = event;

  return (
    <div className="rounded-lg bg-white flex flex-col">
      {media && (
        <img
          src={media}
          alt="Event"
          className="w-full lg:h-60 object-cover rounded-md mb-4"
        />
      )}

      {community && (
        <div className="flex items-center mb-2">
          <img
            src={media || "https://via.placeholder.com/40"}
            alt="Community"
            loading="lazy"
            className="w-10 h-10 rounded-full mr-3"
          />
          <h4 className="lg:text-lg text-sm font-semibold text-gray-800">
            {community}
          </h4>
        </div>
      )}

      <h3 className="text-sm font-semibold text-gray-800 truncate mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-sm flex items-center mb-2">
        <img src={clockImage} alt="Timer Icon" className="mr-2 w-5 h-5" />
        {startDate ? new Date(startDate).toLocaleString() : "No Date"}
      </p>

      <p className="text-gray-700 text-sm flex items-center mb-2">
        <img src={locationImage} loading="lazy" alt="Location Icon" className="mr-2 w-5 h-5" />
        {location}
      </p>
    </div>
  );
};

export default EventCard;
