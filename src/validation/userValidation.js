const userValidation = (values) => {
  const errors = {};

  if (!values.name || values.name === "") {
    errors.name = "Name Required";
  }

  if (!values.age || values.age === "") {
    errors.age = "Age Required";
  }

  if (!values.address || values.address === "") {
    errors.address = "Address Required";
  }

  if (!values.phone || values.phone === "") {
    errors.phone = "Phone Required";
  }

  return errors;
};

export default userValidation;
