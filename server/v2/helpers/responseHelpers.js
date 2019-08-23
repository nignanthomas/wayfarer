const responseError = (res, responseCode, errorMessage) => res.status(responseCode).send({ status: responseCode, error: errorMessage });
const responseSuccess = (res, responseCode, successMessage, data) => res.status(responseCode).send({ status: responseCode, message: successMessage, data });

module.exports = {
  responseError,
  responseSuccess,
};
