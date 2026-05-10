
// Is this value missing or blank?
function isEmpty(value) {
  return value === null || value === undefined || value === '' || value === '-';
}

// Pull the first number out of a string like "78 kg" -> 78. Returns NaN if none.
function getNumber(text) {
  if (typeof text === 'number') return text;
  const match = String(text).match(/[\d.]+/);
  if (match) return parseFloat(match[0]);
  return NaN;
}
