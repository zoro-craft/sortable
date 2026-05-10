/**
 * data.js
 * Mission: Steal the confidential superhero data and keep track of it!
 */

const appData = {
  allHeroes: [],
  pageNumber: 1,
  itemsPerPage: 20,
  searchText: '',
  sortKey: 'name',
  sortOrder: 'asc',
};

// The secret database URL where they hide all their stats
const link = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

fetch(link)
  .then((response) => response.json())
  .then((data) => {
    // We got them! Save the heroes so we can study their weaknesses
    appData.allHeroes = data;
    updateScreen(); // Show our newly acquired data on the screen
  })
  .catch((error) => {
    // Drat! Our evil hacking attempt failed
    console.error('Failed to get data:', error);
  });

// Extract exactly the detail we want to study about the so-called "hero"
function getHeroDetail(hero, detailName) {
  const details = {
    name: hero.name,
    fullName: hero.biography.fullName,
    intelligence: hero.powerstats.intelligence,
    strength: hero.powerstats.strength,
    speed: hero.powerstats.speed,
    durability: hero.powerstats.durability,
    power: hero.powerstats.power,
    combat: hero.powerstats.combat,
    race: hero.appearance.race,
    gender: hero.appearance.gender,
    height: hero.appearance.height[1],
    weight: hero.appearance.weight[1],
    placeOfBirth: hero.biography.placeOfBirth,
    alignment: hero.biography.alignment,
  };
  return details[detailName] ?? '';
}

// Grab the hidden number inside annoying strings like "78 kg"
function getNumber(text) {
  if (typeof text === 'number') return text;
  const match = text.toString().match(/[\d.]+/);
  return match ? parseFloat(match[0]) : NaN;
}

// Find out if they are hiding something from us
function isEmpty(value) {
  return value === null || value === undefined || value === '' || value === '-';
}

// Make sure we put a dash instead of a blank space so our table looks beautifully evil
function showValue(value) {
  if (value === null || value === undefined || value === '') return '-';
  return value;
}