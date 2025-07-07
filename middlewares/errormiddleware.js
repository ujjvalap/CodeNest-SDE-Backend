// error middleware || NEXT function

const errormiddleware = (err, req, res, next) => {
  const defaultErrors = {
    statusCode: 500,
    message: err.message,
  };
  // code missing field error
  if (err.name === "ValidationError") {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  // duplicate error
  if (err.code && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = `${Object.keys(
      err.keyValue
    )} field has to be Unique`;
  }
  res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
};

export default errormiddleware;

