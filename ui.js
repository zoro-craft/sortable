/**
 * ui.js
 * Our master control panel for displaying the superhero targets
 */

// Grab all our evil HTML elements
const tableBody = document.getElementById('tbody');
const searchBox = document.getElementById('search');
const sizeDropdown = document.getElementById('page-size');
const backButton = document.getElementById('prev');
const forwardButton = document.getElementById('next');
const pageLabel = document.getElementById('page-info');
const tableHeaders = document.querySelectorAll('th');

// The grand orchestrator: updates our whole evil dashboard!
function updateScreen() {
  const foundHeroes = searchHeroes(appData.allHeroes, appData.searchText);
  const orderedHeroes = orderHeroes(foundHeroes, appData.sortKey, appData.sortOrder);
  const totalPages = calculateTotalPages(orderedHeroes.length, appData.itemsPerPage);

  // Make sure we aren't looking at a non-existent page
  if (appData.pageNumber > totalPages) appData.pageNumber = 1;

  const heroesOnScreen = slicePage(orderedHeroes, appData.itemsPerPage, appData.pageNumber);

  drawTable(heroesOnScreen);
  updateButtons(appData.pageNumber, totalPages);
  drawArrows();
}

// Build the table rows so we can glare at their smug faces
function drawTable(heroes) {
  tableBody.innerHTML = '';
  heroes.forEach((hero) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${hero.images.xs}" alt="${hero.name}" loading="lazy"></td>
      <td>${showValue(hero.name)}</td>
      <td>${showValue(hero.biography.fullName)}</td>
      <td>${showValue(hero.powerstats.intelligence)}</td>
      <td>${showValue(hero.powerstats.strength)}</td>
      <td>${showValue(hero.powerstats.speed)}</td>
      <td>${showValue(hero.powerstats.durability)}</td>
      <td>${showValue(hero.powerstats.power)}</td>
      <td>${showValue(hero.powerstats.combat)}</td>
      <td>${showValue(hero.appearance.race)}</td>
      <td>${showValue(hero.appearance.gender)}</td>
      <td>${showValue(hero.appearance.height[1])}</td>
      <td>${showValue(hero.appearance.weight[1])}</td>
      <td>${showValue(hero.biography.placeOfBirth)}</td>
      <td>${showValue(hero.biography.alignment)}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Update our master pagination buttons
function updateButtons(current, total) {
  pageLabel.textContent = `Page ${current} / ${total || 1}`;
  backButton.disabled = current === 1;
  forwardButton.disabled = current >= total;
}

// Point an arrow at the column we are currently analyzing
function drawArrows() {
  tableHeaders.forEach((header) => {
    header.textContent = header.textContent.replace(/ [▲▼]$/, '');
    header.classList.remove('sorted');

    if (header.dataset.column === appData.sortKey) {
      header.classList.add('sorted');
      header.textContent += appData.sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
  });
}

// Whenever we type in our villainous search box...
searchBox.addEventListener('input', (event) => {
  appData.searchText = event.target.value;
  appData.pageNumber = 1;
  updateScreen();
});

// Whenever we change how many targets we want to view...
sizeDropdown.addEventListener('change', (event) => {
  appData.itemsPerPage = event.target.value === 'all' ? 'all' : Number(event.target.value);
  appData.pageNumber = 1;
  updateScreen();
});

// Clicking the back button to view previous targets...
backButton.addEventListener('click', () => {
  appData.pageNumber--;
  updateScreen();
});

// Clicking the forward button to find more targets...
forwardButton.addEventListener('click', () => {
  appData.pageNumber++;
  updateScreen();
});

// Clicking a column to re-sort our hitlist!
tableHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    const columnKey = header.dataset.column;
    if (!columnKey || columnKey === 'image') return;

    if (appData.sortKey === columnKey) {
      appData.sortOrder = appData.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      appData.sortKey = columnKey;
      appData.sortOrder = 'asc';
    }
    updateScreen();
  });
});