/**
 * logic.js 
 * The evil mastermind logic: filtering the weak and sorting out the strong!
 */

// Hunt down specific superheroes by their annoying names
function searchHeroes(heroList, text) {
  const lowercaseText = text.toLowerCase();
  return heroList.filter((hero) => hero.name.toLowerCase().includes(lowercaseText));
}

// Order the heroes to easily find the most vulnerable ones
function orderHeroes(heroList, key, order) {
  return [...heroList].sort((heroA, heroB) => {
    // Get their hidden details
    const firstValue = getHeroDetail(heroA, key);
    const secondValue = getHeroDetail(heroB, key);

    // If they have no data, push them to the bottom where they belong!
    const isFirstEmpty = isEmpty(firstValue);
    const isSecondEmpty = isEmpty(secondValue);
    if (isFirstEmpty && isSecondEmpty) return 0;
    if (isFirstEmpty) return 1;
    if (isSecondEmpty) return -1;

    const stringA = String(firstValue).toLowerCase();
    const stringB = String(secondValue).toLowerCase();

    // Special evil check: Meters are always bigger than cm, and tons are bigger than kg!
    if (stringA.includes('meter') && stringB.includes('cm')) return order === 'asc' ? 1 : -1;
    if (stringA.includes('cm') && stringB.includes('meter')) return order === 'asc' ? -1 : 1;
    if (stringA.includes('ton') && stringB.includes('kg')) return order === 'asc' ? 1 : -1;
    if (stringA.includes('kg') && stringB.includes('ton')) return order === 'asc' ? -1 : 1;

    // Normal number comparisons for their power stats
    const numberA = getNumber(firstValue);
    const numberB = getNumber(secondValue);
    if (!isNaN(numberA) && !isNaN(numberB)) {
      return order === 'asc' ? numberA - numberB : numberB - numberA;
    }

    // Default alphabetical sorting for everything else
    return order === 'asc'
      ? stringA.localeCompare(stringB)
      : stringB.localeCompare(stringA);
  });
}

// Slice out just the targets we want to look at right now
function slicePage(heroList, itemsPerPage, pageNumber) {
  if (itemsPerPage === 'all') return heroList;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  return heroList.slice(startIndex, startIndex + itemsPerPage);
}

// Calculate exactly how many pages of targets we have
function calculateTotalPages(totalHeroes, itemsPerPage) {
  if (itemsPerPage === 'all') return 1;
  return Math.ceil(totalHeroes / itemsPerPage);
}