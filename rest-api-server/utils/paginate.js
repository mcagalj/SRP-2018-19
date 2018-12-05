const debug = require("debug")("rest-server:utils.paginate");

module.exports = (inputArray, pageNumber, filter) => {
  const pageSize = Number(process.env.ARRAY_PAGE_SIZE);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = pageNumber * pageSize;
  const lastPage = Math.ceil(inputArray.length / pageSize);

  let array = inputArray.slice(startIndex, endIndex);
  if (typeof filter === "function") {
    array = array.map(filter);
  }

  return {
    array,
    nextPage: Math.min(pageNumber + 1, lastPage),
    lastPage
  };
};
