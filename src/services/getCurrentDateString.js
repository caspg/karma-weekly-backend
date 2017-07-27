/**
 * Returns date string in YYYY-MM-DD format
 * @returns {String}
 */
function getCurrentDateString() {
  const now = new Date();
  const yyyymmdd = now.toISOString().slice(0, 10);

  return yyyymmdd;
}

module.exports = getCurrentDateString;
