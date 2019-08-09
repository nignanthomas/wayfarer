const nextId = (array) => {
  let newId = null;
  if (!array.length) {
    newId = 1;
  } else {
    const last = array[array.length - 1];
    const { id } = last;
    newId = id + 1;
  }
  return newId;
};
module.exports = {
  nextId,
};
