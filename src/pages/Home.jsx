import { useNavigate } from "react-router-dom";

const Home = () => {
  // useNavigation function calling of react-router-dom
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-4">
        {/* Buttons to Navigate Between Screens*/}
        <button onClick={() => {navigate("/add-events");}}
            className="block w-36 bg-blue-600 text-white rounded-full py-2 shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
            Add Events
        </button>
        <button onClick={() => {navigate("/events");}}
            className="block w-36 text-black border-2 rounded-full py-2 shadow-md focus:ring-2 focus:ring-blue-500">
            Show Events
        </button>
      </div>
    </div>
  );
};

export default Home;
