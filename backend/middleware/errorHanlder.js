export const errorHanlder = (err, req, res, next) => {
  console.log(res);
  const status = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message });
};
