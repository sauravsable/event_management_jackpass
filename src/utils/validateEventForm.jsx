const validateEventForm = (formData) => {
  let errors = {};

  if (!formData.community) errors.community = "Community selection is required.";
  if (!formData.title.trim()) errors.title = "Event title is required.";
  if (!formData.location.trim()) errors.location = "Event Location is required.";
  if (!formData.description.trim()) errors.description = "Event description is required.";
  if (formData.startDate && formData.endDate) {
    const startDateTime = new Date(formData.startDate);
    const endDateTime = new Date(formData.endDate);

    if (startDateTime > endDateTime) {
      errors.endDate = "End date and time must be after start date and time.";
    }
  }

  return errors;
};

export default validateEventForm;
