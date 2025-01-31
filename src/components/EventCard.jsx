import clockImage from "../Assets/stopwatch.png";
import locationImage from "../Assets/location.png";

// event is destructured from the props
const EventCard = ({ event }) => {

  // Destructuring data from the event object
  const { media, community, title, startDate, location,communityImage } = event;

  // Function to render media as either image or video
  const renderMedia = () => {
    if (media) {
      // Conditional rendering of video or image 
      if (media?.fileType && media?.fileType.startsWith("video")) {
        return (
          <video autoPlay loop muted  className="w-full lg:h-60 object-cover rounded-md mb-4">
            <source src={media?.url} type={media?.fileType} />
            Your browser does not support the video tag.
          </video>
        );
      } 
      else if (media?.url && media?.url.startsWith("data:image")) {
        return (
          <img
            src={media?.url}
            alt="Event"
            className="w-full lg:h-60 object-cover rounded-md mb-4"
          />
        );
      }
    }
    // returning null if both are not present
    return null;
  };

  return (
    <div className="rounded-lg bg-white flex flex-col">
      {/* Render media (image or video) */}
      {renderMedia()}

      {communityImage && (
        <div className="flex items-center mb-2">
          <img
            src={communityImage}
            alt="Community"
            loading="lazy"
            className="w-10 h-10 rounded-full mr-3"
          />
          <h4 className="lg:text-lg text-sm font-semibold text-gray-800">
            {community}
          </h4>
        </div>
      )}

      <h3 className="text-md font-semibold text-gray-800 truncate mb-2">
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
