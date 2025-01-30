const validateEventForm = (formData) => {
  let errors = {};

  if (!formData.community) errors.community = "Community selection is required.";
  if (!formData.title.trim()) errors.title = "Event title is required.";
  if (!formData.location.trim()) errors.location = "Event Location is required.";
  if (!formData.description.trim()) errors.description = "Event description is required.";
  if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
    errors.endDate = "End date must be after start date.";
  }

  return errors;
};

export default validateEventForm;
