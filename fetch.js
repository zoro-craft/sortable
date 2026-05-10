const HERO_URL = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

// take one messy hero from the API and return a flat, simple object.
function cleanHero(hero) {
  const images = hero.images || {};
  const stats = hero.powerstats || {};
  const look = hero.appearance || {};
  const bio = hero.biography || {};
  const heightArr = look.height || ['', ''];
  const weightArr = look.weight || ['', ''];

  return {
    id: hero.id,
    image: images.xs || '',
    name: hero.name || '',
    fullName: bio.fullName || '',
    intelligence: stats.intelligence || '',
    strength: stats.strength || '',
    speed: stats.speed || '',
    durability: stats.durability || '',
    power: stats.power || '',
    combat: stats.combat || '',
    race: look.race || '',
    gender: look.gender || '',
    height: heightArr[1] || '',
    weight: weightArr[1] || '',
    placeOfBirth: bio.placeOfBirth || '',
    alignment: bio.alignment || ''
  };
}
// Download all the heroes and return them as a clean array.
export async function loadHeroes() {
  const response = await fetch(HERO_URL);
  const rawList = await response.json();

  const cleanList = [];
  for (let i = 0; i < rawList.length; i++) {
    cleanList.push(cleanHero(rawList[i]));
  }
  return cleanList;
}