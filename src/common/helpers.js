export const getArrayOfUniqueIds = (arr, id) => {
  if (arr.some((val) => val.toString() === id)) {
    return arr;
  }
  return arr.concat(id);
};
