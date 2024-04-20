export const errorHanlder = (err, req, res, next) => {
  let status = res.statusCode || 500;
  let message = err.message || "Internal Server Error";
  if (err.name === "CaseError") {
    message = `Resource not found, invalid ${err.path}`;
    status = 400;
  }
  return res.status(status).json({ message });
};
