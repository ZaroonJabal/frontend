export function formatNumber(value) {
  return value ? new Intl.NumberFormat("en-US").format(Number(value)) : value;
}

export function formatFloat(value, minimumFractionDigits = 2) {
  const options = { minimumFractionDigits };
  return new Intl.NumberFormat("en-US", options).format(value);
}


export function getMonthFromDate(dateString) {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(-2);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Ensure month is a valid number
  const monthNumber = parseInt(month, 10);
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return 'Invalid Date';
  }

  const formattedDate = `${year} ${monthNames[monthNumber - 1]}`;
  return formattedDate;
};