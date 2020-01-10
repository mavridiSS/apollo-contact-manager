const validate = contact => {
  const invalidFields = {};
  Object.keys(contact).forEach(key => {
    if (!contact[key])
      invalidFields[key] = {
        error: true,
        helperText: "This field is required"
      };
  });
  return invalidFields;
};

export { validate };
