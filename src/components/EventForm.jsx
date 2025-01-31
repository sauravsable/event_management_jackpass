import uploadImage from "../Assets/gallery.png";
import uploadIcon from "../Assets/upload_icon.png";
import useFormData from "../utils/useFormData";
import GoogleMap from "./GoogleMap";
import communities from "../Data/community.json"; // Array of Community Data
import downArrow from "../Assets/down.png";
import upArrow from "../Assets/upward.png";
import locationImage from "../Assets/locationIcon.png";
import nextIcon from "../Assets/next.png";
import descriptionIcon from "../Assets/pencil.png";

const EventForm = () => {

  // importing the functions and states from the useFormData Custom Hook
  const {formData,
    mediaPreview,
    errors,
    handleInputChange,
    handleMediaChange,
    handleSubmit,
    handleMediaClick,
    fileInputRef
  } = useFormData();


  // checking that all the input fields are entered, true if all the fields are entered else false 
  const isFormValid = formData.community && formData.title && 
                      formData.startDate && formData.endDate && 
                      formData.location && formData.description &&
                      Object.keys(formData.media).length > 0;

  // isButtonDisabled button will be false of isFormValid
  const isButtonDisabled = !isFormValid;

  // Deciding the class of the button based on the isFormValid
  const buttonClass = isFormValid
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-blue-400 text-white cursor-not-allowed";



  return (
    <form onSubmit={handleSubmit} className="lg:flex lg:w-full lg:h-full mx-auto lg:gap-6 lg:p-6 lg:bg-white bg-gray-100 rounded-3xl shadow-xl">
      <div className="left lg:w-2/4 lg:p-0 p-4 bg-white">
        <h1 className="lg:text-left text-center mb-4 text-lg font-semibold text-gray-800">Create New Event</h1>

        <div className="relative bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg overflow-hidden lg:h-[94%] h-96 flex items-center justify-center">
          {mediaPreview?.url ? (
            <>
              {mediaPreview?.type?.startsWith("video") ? (
                <video autoPlay loop muted className="w-full h-full object-cover">
                  <source src={mediaPreview?.url} type={mediaPreview?.type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
              <img
                src={mediaPreview?.url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              )}
              <button type="button" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg px-4 py-2 shadow-md text-sm font-medium" onClick={handleMediaClick}>
                <img src={uploadIcon} alt="Upload Icon" className="inline-block w-4 h-4 mr-2" />
                Replace Photo/Video
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <img src={uploadImage} alt="Upload" className="lg:w-full lg:h-60 w-40 h-40 mb-2" />
              {/* handleMediaClick called used to click on the image/video input */}
              <button type="button" className="bg-white border rounded-lg px-4 py-2 shadow-md text-sm font-medium" onClick={handleMediaClick}>
                <img src={uploadIcon} alt="Upload Icon" className="inline-block w-4 h-4 mr-2" />
                Add Photo/Video
              </button>
            </div>
          )}
          {/* fileInputRef is Refering the Image/Video Input*/}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="right lg:w-2/4 lg:h-[100%] flex flex-col justify-end">
        <div className="lg:mb-4 mb-2 bg-white lg:p-0 p-4 flex flex-col gap-2">
          <label htmlFor="community" className="block text-sm font-medium text-gray-600">Select Community</label>
          <div className="relative lg:mb-2">
            <select name="community" value={formData.community} onChange={handleInputChange} required className="block w-full border-2 outline-none rounded-3xl appearance-none py-3 px-4 bg-white focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>Select Community</option>
              {/* Mapping community Data*/}
              {communities.map((community, index) => (
                <option key={index} value={community.name}>{community.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img src={downArrow} alt="Dropdown Arrow" className="w-4 h-4" />
            </div>
            {/*Custom Error*/}
            {errors.community && <p className="text-red-500 text-sm">{errors.community}</p>}
          </div>

          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="block w-full border-2 outline-none rounded-3xl appearance-none py-3 px-4 bg-white focus:ring-2 focus:ring-blue-500" />
           {/*Custom Error*/}
          {errors.title && <p className="text-red-500 font-semibold text-sm">{errors.title}</p>}
        </div>

        <div className="grid lg:grid-cols-[30%,70%]  grid-cols-[35%,65%] lg:p-0 lg:mb-4 mb-2 p-4 bg-white">
          <div className="space-y-2 flex gap-x-4">
            <div className="flex flex-col justify-center">
              <img src={upArrow} alt="Dropdown Arrow" className="w-4 h-4 mt-2" />
              <p className="m-0 h-2 flex items-center justify-center">.</p>
              <p className="m-0 h-2 flex items-center justify-center">.</p>
              <p className="m-0 h-2 flex items-center justify-center">.</p>
              <p className="m-0 h-2 flex items-center justify-center">.</p>
              <p className="m-0 h-2 flex items-center justify-center">.</p>
              <img src={upArrow} alt="Dropdown Arrow" className="w-4 h-4 mt-2 transform rotate-180" />
            </div>

            <div className="mt-0 lg:mt-0 flex flex-col justify-evenly gap-8">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">Start Date</label>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">End Date</label>
            </div>
          </div>

          <div className="space-y-2">
            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="block w-full border outline-none rounded-3xl py-3 px-4 focus:ring-2 focus:ring-blue-500" />
            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleInputChange} required className="block w-full border outline-none rounded-3xl py-3 px-4 focus:ring-2 focus:ring-blue-500" />
             {/*Custom Error*/}
            {errors.endDate && <p className="text-red-500 font-semibold text-sm">{errors.endDate}</p>}
          </div>
        </div>

        <div className="bg-white lg:p-0 lg:mb-4 mb-2 p-4">
          <div className="flex items-center gap-4 lg:mb-4">
            <img src={locationImage} alt="locationIcon" className="w-5 h-5" />
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} required placeholder="Choose Location" className="block w-full text-sm text-black rounded-3xl py-3 px-2 outline-none focus:ring-0 focus:outline-none bg-white peer" />
            <img src={nextIcon} alt="nextIcon" className="w-5 h-5" />
          </div>
          
          {/* Showing Google Map initially only for Large screens due to user experience */}
          <div className="googleMap bg-white mb-2 lg:p-0 pt-4 hidden lg:block">
            <GoogleMap location={formData.location || "Gurugram" } />
          </div>

          {/*Showing location map based on location entered initially hidden for smaller screen */}
          {formData.location && (
            <div className="googleMap bg-white mb-2 mt-3 lg:hidden">
              <GoogleMap location={formData.location} />
            </div>
          )}

           {/*Custom Error*/}
          {errors.location && <p className="text-red-500 font-semibold text-sm">{errors.location}</p>}
        </div>

        <div className="bg-white lg:mb-4 lg:p-0 p-4">
          <div className="flex items-start gap-4">
            <img src={descriptionIcon} alt="Description Icon" className="w-5 h-5 mt-1" />
            <div className="flex-1">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                Event Description <span className="text-red-500">*</span>
              </label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Add a brief description to let attendees know what your event is about." className="block text-sm w-full outline-none focus:ring-0 focus:outline-none bg-white peer" rows="3"></textarea>
            </div>
            <img src={nextIcon} alt="Next Icon" className="w-5 h-5 mt-1" />
          </div>

           {/*Custom Error*/}
          {errors.description && <p className="text-red-500 font-semibold text-sm">{errors.description}</p>}
        </div>

        <div className="space-y-2 lg:p-0 px-4 py-2 bg-white">
         {/* Initially Button Disabled */}
          <button type="submit" disabled={isButtonDisabled} className={`block w-full rounded-full py-3 shadow-md focus:ring-2 focus:ring-blue-500 ${buttonClass}`}>
          Create Event
          </button>
        </div>

      </div>
    </form>
  );
};

export default EventForm;
