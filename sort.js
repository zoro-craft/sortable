
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

// Keep only heroes whose name contains the search text.
export function searchHeroes(list, text) {
  const lower = text.toLowerCase();
  const result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].name.toLowerCase().indexOf(lower) !== -1) {
      result.push(list[i]);
    }
  }
  return result;
}

// Sort heroes by a column ('name', 'strength', etc.) ascending or descending.
export function sortHeroes(list, key, order) {
  const copy = list.slice(); // don't change the original

  copy.sort(function (a, b) {
    const x = a[key];
    const y = b[key];

    // Empty values always go to the bottom
    const emptyX = isEmpty(x);
    const emptyY = isEmpty(y);
    if (emptyX && emptyY) return 0;
    if (emptyX) return 1;
    if (emptyY) return -1;

    const sx = String(x).toLowerCase();
    const sy = String(y).toLowerCase();

    // Handle mixed units: "2 meters" vs "180 cm", "1 ton" vs "90 kg"
    if (sx.indexOf('meter') !== -1 && sy.indexOf('cm') !== -1) {
      return order === 'asc' ? 1 : -1;
    }
    if (sx.indexOf('cm') !== -1 && sy.indexOf('meter') !== -1) {
      return order === 'asc' ? -1 : 1;
    }
    if (sx.indexOf('ton') !== -1 && sy.indexOf('kg') !== -1) {
      return order === 'asc' ? 1 : -1;
    }
    if (sx.indexOf('kg') !== -1 && sy.indexOf('ton') !== -1) {
      return order === 'asc' ? -1 : 1;
    }

    // If both are numbers, compare as numbers
    const nx = getNumber(x);
    const ny = getNumber(y);
    if (!isNaN(nx) && !isNaN(ny)) {
      if (order === 'asc') return nx - ny;
      return ny - nx;
    }

    // Otherwise compare as text
    if (order === 'asc') return sx.localeCompare(sy);
    return sy.localeCompare(sx);
  });

  return copy;
}
