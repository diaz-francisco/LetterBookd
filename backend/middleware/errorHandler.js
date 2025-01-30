module.exports = (err, _req, res, _next) => {
  res.status(err.statusCode || 500).json({
    status: "Failed",
    message:
      err.message || "Internal Server Error",
  });
};
