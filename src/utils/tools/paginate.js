export function showPaginate(count = 0, resultsPerPage = 10) {
  if (resultsPerPage === 0) {
    return 0;
  }
  return Math.ceil(count / resultsPerPage) > 1;
};

export function pageCount(count = 0, resultsPerPage = 10) {
  if (resultsPerPage === 0) {
    return 0;
  }
  return Math.ceil(count / resultsPerPage);
};

export function resultLimit(offset = 0, resultsPerPage = 10, max = 0) {
  const limit = offset + resultsPerPage;
  if (max >= limit) {
    return limit;
  } else {
    return max;
  }
}