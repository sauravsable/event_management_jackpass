import EventForm from "../components/EventForm";
import MetaData from "../utils/MetaData";

const AddEvent = () => {
  return (
    <>
      {/*MetaData Componet used to set the title of the page*/}
      <MetaData title="Jackpass Add Event" />

      <div className="lg:p-4 h-screen">

        {/* EventForm component to stored data in databse*/}
        <EventForm />
      </div>
    </>
  );
};

export default AddEvent;
