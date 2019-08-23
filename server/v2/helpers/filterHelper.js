const filtering = (trips, key, option) => trips.filter(trip => trip[key] === option);

const filter = (trips, origin, destination) => {
  let filtered = trips;
  if (trips && origin) {
    filtered = filtering(trips, 'origin', origin);
  }
  if (trips && destination) {
    filtered = filtering(trips, 'destination', destination);
  }
  return filtered;
};

module.exports = {
  filter,
};
