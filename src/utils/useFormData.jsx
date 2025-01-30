import { useState, useRef } from "react";
import validateEventForm from "../utils/validateEventForm";

const useFormData = (navigate) => {
  const [formData, setFormData] = useState({
    community: "",
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    media: null,
  });

  const [mediaPreview, setMediaPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      const MAX_SIZE = 10 * 1024 * 1024;

      if (file.size > MAX_SIZE) {
        alert("The file is too large. Please upload a file smaller than 5MB.");
        return;
      }

      const fileType = file.type;
      if (fileType.startsWith("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resizeImage(reader.result, fileType);
        };
      } else if (fileType.startsWith("video")) {
        const videoURL = URL.createObjectURL(file);
        setMediaPreview({ url: videoURL, type: fileType });
        setFormData((prevData) => ({ ...prevData, media: file }));
      }
    }
  };

  const resizeImage = (mediaData, fileType) => {
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
      setMediaPreview(resizedMedia);
      setFormData((prevData) => ({
        ...prevData,
        media: resizedMedia,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mediaPreview) alert("Please upload an event image or video.");
    
    const newErrors = validateEventForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    savedEvents.push(formData);
    localStorage.setItem("events", JSON.stringify(savedEvents));
    navigate("/events");
  };

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
