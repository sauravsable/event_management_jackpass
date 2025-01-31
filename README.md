Event Management App

A simple React-based Event Management App that allows users to create, view, and manage events. The application supports media uploads (images or videos), Google Maps integration, and dynamic community-based event categorization.

*Features

1.Event Creation:
  
  a. Users can create new events by providing event title, description, start and end dates, location, and selecting a community.
  b. Users can upload media (images or videos) to be associated with the event.

2. Event List: A dynamic list of all events is displayed. Each event is shown in a card that contains essential information such as title, community, date, and location.

3. Google Maps Integration: A Google Map is embedded dynamically based on the event location entered by the user, providing a visual reference for event locations.

4. Responsive Design: The app is fully responsive, adapting to different screen sizes to ensure a smooth user experience on both desktop and mobile devices.

*Technologies Used

1. React: A JavaScript library for building user interfaces. It allows us to create reusable UI components and manage the application state effectively.

2. React Hooks (useState, useEffect): These hooks are used for managing the state and side effects in functional components. useState manages the event data, while useEffect is used for fetching and setting the       events from localStorage.

3. React-Helmet: A library for managing changes to the document head. It is used here to dynamically set the page title to reflect the current page and content.

4. Tailwind CSS: A utility-first CSS framework used for styling the app. It makes it easy to build modern, responsive, and flexible layouts without writing custom CSS.

5. Google Maps API (via iframe): Embeds a dynamic Google Map based on the event’s location by generating the map's URL dynamically.

6. LocalStorage: Stores event data locally in the browser so that it persists between sessions, even if the page is reloaded or the app is closed.

*Component Overview

1. EventForm: This component allows users to create new events. It handles user input for event details, such as title, start and end dates, location, and description. The component also allows users to upload 
    images or videos associated with the event.

2. EventCard: Displays a card for each event, showing the event's title, community, start date, location, and media (image or video). The event's media is rendered conditionally based on the file type (image/video).

3. EventList: Displays a grid of all events stored in localStorage. Each event is passed to the EventCard component for rendering.

4. GoogleMap: This component renders a Google Map iframe based on the event’s location. The map is embedded dynamically using the Google Maps URL.

5. ShowEvents: The main page that lists all events. It also includes a tab navigation feature to toggle between viewing events and communities. The event data is loaded from localStorage and passed down to the EventList component.

*Challenges Faced

1. Aspect Ratio Issue with Video: One of the challenges was adjusting the aspect ratio of the video correctly. Initially, only the first frame of the video was being adjusted, and not the entire playback. After       some investigation, I had to ensure the video player’s dimensions were properly handled to maintain the desired aspect ratio throughout the entire video playback.

2. Dynamic Google Map Embedding: Another challenge was dynamically embedding a Google Map iframe based on the location entered by the user. The URL for the map iframe needed to be updated each time a user             selected or typed a new location. This was resolved by using React state and dynamically updating the iframe's src attribute.

3. Managing Event Data in LocalStorage:Ensuring that event data was correctly saved and retrieved from localStorage was tricky. I needed to account for cases where the data might be missing or malformed, as well      as handle updates to the event list. I also made sure that the data persisted between sessions without any loss.

4. Conditional Rendering of Events and Communities: The feature to toggle between displaying events and communities required careful handling of tab-based navigation. I used the tabIndex state to conditionally       render the event list and placeholder content for communities.

* Setup & Installation
To get started with the project, follow the steps below:

1. git clone https://github.com/sauravsable/event_management_jackpass.git
2. cd event-management-app
3. Install Dependencies:
4. npm install
5. Start the Development Server:
6. npm start
This will start the development server, and you can view the app in your browser at http://localhost:3000.
