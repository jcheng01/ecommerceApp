const errorHandler = (error, req, res, next) => {
  if (error) {
    res.status(400).json({
      status: "Failed",
      error: `Error middleware: ${error}`,
    });
    return;
  } else {
    next();
  }
};

export default errorHandler;
