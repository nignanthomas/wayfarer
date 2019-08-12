const responseError = (res, responseCode, errorMessage) => res.status(responseCode).json({ status: responseCode, error: errorMessage });
const responseSuccess = (res, responseCode, successMessage, data) => res.status(responseCode).json({ status: responseCode, message: successMessage, data });

module.exports = {
  responseError,
  responseSuccess,
};
