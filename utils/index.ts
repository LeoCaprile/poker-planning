/**
 * @param {number} date the date to check in epoch timestamp.
 * @returns {boolean} true if the date is older than one month.

*/

export const checkIfDateIsOneMonthOld = (date: number): boolean => {
  const now = new Date();
  const diff = now.getTime() - date;
  const month = 1000 * 60 * 60 * 24 * 30;
  return diff >= month;
};
