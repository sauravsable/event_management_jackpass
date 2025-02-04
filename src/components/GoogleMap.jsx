// GoogleMap component which is simply a javascript function

const GoogleMap = ({ location }) => {
  // Dynamic URL of the google map iframe
  const googleMapsEmbedURL = location
    ? `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`
    : null;

  return (
    <div>
      {googleMapsEmbedURL && (
        // Google Map Iframe provided by Google
        <iframe
          width="100%"
          height="160"
          frameBorder="0"
          style={{ border: 0 }}
          src={googleMapsEmbedURL}
          allowFullScreen
          title="Google Map"
          className="rounded-3xl lg:mt-2"
        ></iframe>
      )}
    </div>
  );
};

export default GoogleMap;
