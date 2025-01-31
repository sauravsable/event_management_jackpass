import { useState, useRef } from "react";
import { toast } from "react-toastify";
import communities from '../Data/community.json';
import { useNavigate } from "react-router-dom";
import validateEventForm from "../utils/validateEventForm";

// Custom hook to handle form data and media resizing
const useFormData = () => {

  const navigate = useNavigate();

  // formData state to store the form input
  const [formData, setFormData] = useState({
    community: "",
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    communityImage:"",
    media: {},
  });

  const [mediaPreview, setMediaPreview] = useState({}); // Initialize as an empty object
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Handle input change for text fields
  const handleInputChange = (e) => {

    const selectedCommunity = communities.find(
      (community) => community.name === formData.community
    );

    setFormData({ ...formData, 
      [e.target.name]: e.target.value,
      communityImage: selectedCommunity ? selectedCommunity.imageUrl : "" 
    });
  };

  // function to resize image using canvas api
  const resizeImage = (mediaData, fileType) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = mediaData;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const aspectRatio = 4 / 5;
        let width = img.width;
        let height = img.height;

        if (width / height > aspectRatio) {
          width = height * aspectRatio;
        } else {
          height = width / aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const resizedMedia = canvas.toDataURL(fileType);
        resolve(resizedMedia); // Resolve the resized image
      };
    });
  };

  // Resize video to 4:5 aspect ratio and return a base64-encoded video
  const resizeVideo = async (videoData, fileType) => {
    return new Promise(async (resolve) => {
      const videoElement = document.createElement("video");
      videoElement.src = videoData;

      // Waiting until the video is loaded
      await new Promise((resolve) => {
        videoElement.onloadeddata = resolve;
      });

      const aspectRatio = 4 / 5;
      const targetWidth = 640; // Target width
      const targetHeight = targetWidth / aspectRatio; // Target height to maintain 4:5 ratio

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Create a MediaRecorder to record the resized video
      const stream = canvas.captureStream(30); // Capture at 30fps
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

      let recordedChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      // Resolve the base64 video when the recording stops
      mediaRecorder.onstop = async () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const base64Video = await convertBlobToBase64(blob);
        resolve(base64Video); // Return base64-encoded video
      };

      mediaRecorder.start();

      // Play video and draw resized frames on the canvas
      const drawFrame = () => {
        if (!videoElement.paused && !videoElement.ended) {
          // Draw resized frame on the canvas
          ctx.drawImage(videoElement, 0, 0, targetWidth, targetHeight);

          // Continue drawing next frame
          requestAnimationFrame(drawFrame);
        }
      };

      videoElement.play();
      drawFrame();

      // Stop recording when the video ends
      videoElement.onended = () => {
        mediaRecorder.stop();
      };
    });
  };

  // fucntion to convert Blob to base64
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);  // Reads the Blob as a base64 data URL
    });
  };

  // Handle media file input
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB size limit

      // Check ing input file size limit
      if (file.size > MAX_SIZE) {
        alert("The file is too large. Please upload a file smaller than 5MB.");
        return;
      }

      const fileType = file.type;
      if (fileType.startsWith("image")) {
        // Handle image resizing
        const reader = new FileReader();
        reader.onload = async () => {
          // Setting the mediaPreview the input file not the resized image/video
          setMediaPreview({ url: reader.result, type: fileType });
          const resizedBase64 = await resizeImage(reader.result, fileType);
          setFormData((prevData) => ({
            ...prevData,
            media: { url: resizedBase64, fileType },
          }));
        };
        reader.readAsDataURL(file);
      } else if (fileType.startsWith("video")) {
        // Handle video resizing
        const reader = new FileReader();
        reader.onload = async () => {
           // Setting the mediaPreview the input file not the resized image/video
          setMediaPreview({ url: reader.result, type: fileType });
          const resizedBase64Video = await resizeVideo(reader.result, fileType);
          setFormData((prevData) => ({
            ...prevData,
            media: { url: resizedBase64Video, fileType },
          }));
        };
        reader.readAsDataURL(file);
      } else {
        alert("Unsupported file type. Please upload an image or video.");
      }
    }
  };

  // function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mediaPreview.url) {
      toast.error("Please upload an event image or video.");
      return;
    }

    const newErrors = validateEventForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) { 
      toast.error("All fields are required.");
      return;
    }

    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    savedEvents.push(formData);
    localStorage.setItem("events", JSON.stringify(savedEvents));

    toast.success("Event submitted successfully!");

    // Reset form and preview
    setFormData({
      community: "",
      title: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      communityImage: "",
      media: {},
    });
    setMediaPreview({});

    // Reset errors
    setErrors({});

    navigate("/events");
  };

  // Triggers click on the image/video input
  const handleMediaClick = () => {
    fileInputRef.current.click();
  };

  return {
    formData,
    mediaPreview,
    handleInputChange,
    handleMediaChange,
    handleSubmit,
    fileInputRef,
    handleMediaClick,
    errors,
  };
};

export default useFormData;
