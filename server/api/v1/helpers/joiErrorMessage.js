const errorMessage = (messages) => {
  const allMessage = [];
  messages.forEach((message) => {
    allMessage.push(message.message);
  });
};
module.exports = {
  errorMessage,
};
