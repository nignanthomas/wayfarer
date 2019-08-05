const responseError = (res, responseCode, errorMessage) => res.status(responseCode).json({ status: 'error', error: errorMessage });
const responseSuccess = (res, responseCode, successMessage) => res.status(responseCode).json({ status: 'success', data: successMessage });

module.exports = {
  responseError,
  responseSuccess,
};
