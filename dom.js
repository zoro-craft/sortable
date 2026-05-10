/* dom.js — draws the table and listens for user clicks. */

// Grab the page elements once
const tableBody = document.getElementById('tbody');
const searchBox = document.getElementById('search');
const sizeDropdown = document.getElementById('page-size');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageLabel = document.getElementById('page-info');
const tableHeaders = document.querySelectorAll('th');

// Show '-' instead of empty/blank values
function showValue(value) {
  if (value === null || value === undefined || value === '') return '-';
  return value;
}

// Build the table rows from the current page of heroes
function drawTable(heroes) {
  tableBody.innerHTML = '';
  for (let i = 0; i < heroes.length; i++) {
    const h = heroes[i];
    const row = document.createElement('tr');
    row.innerHTML =
      '<td><img src="' + h.image + '" alt="' + h.name + '" loading="lazy"></td>' +
      '<td>' + showValue(h.name) + '</td>' +
      '<td>' + showValue(h.fullName) + '</td>' +
      '<td>' + showValue(h.intelligence) + '</td>' +
      '<td>' + showValue(h.strength) + '</td>' +
      '<td>' + showValue(h.speed) + '</td>' +
      '<td>' + showValue(h.durability) + '</td>' +
      '<td>' + showValue(h.power) + '</td>' +
      '<td>' + showValue(h.combat) + '</td>' +
      '<td>' + showValue(h.race) + '</td>' +
      '<td>' + showValue(h.gender) + '</td>' +
      '<td>' + showValue(h.height) + '</td>' +
      '<td>' + showValue(h.weight) + '</td>' +
      '<td>' + showValue(h.placeOfBirth) + '</td>' +
      '<td>' + showValue(h.alignment) + '</td>';
    tableBody.appendChild(row);
  }
}

// Update the page number label and enable/disable prev/next
function drawPager(currentPage, totalPages) {
  pageLabel.textContent = 'Page ' + currentPage + ' / ' + (totalPages || 1);
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage >= totalPages;
}

// Show ▲ or ▼ next to the column we sorted by
function drawArrows(sortKey, sortOrder) {
  for (let i = 0; i < tableHeaders.length; i++) {
    const th = tableHeaders[i];
    th.textContent = th.textContent.replace(/ [▲▼]$/, '');
    th.classList.remove('sorted');
    if (th.dataset.column === sortKey) {
      th.classList.add('sorted');
      if (sortOrder === 'asc') {
        th.textContent = th.textContent + ' ▲';
      } else {
        th.textContent = th.textContent + ' ▼';
      }
    }
  }
}

// One function to redraw everything from a state snapshot
export function renderAll(view) {
  drawTable(view.rows);
  drawPager(view.page, view.totalPages);
  drawArrows(view.sortKey, view.sortOrder);
}

// Hook up all the user inputs. main.js gives us a callback to run when something changes.
export function bindEvents(onChange) {
  searchBox.addEventListener('input', function (event) {
    onChange({ type: 'search', value: event.target.value });
  });

  sizeDropdown.addEventListener('change', function (event) {
    let value = event.target.value;
    if (value !== 'all') value = Number(value);
    onChange({ type: 'pageSize', value: value });
  });

  prevButton.addEventListener('click', function () {
    onChange({ type: 'pageStep', value: -1 });
  });

  nextButton.addEventListener('click', function () {
    onChange({ type: 'pageStep', value: 1 });
  });

  for (let i = 0; i < tableHeaders.length; i++) {
    const th = tableHeaders[i];
    th.addEventListener('click', function (event) {
      const key = event.currentTarget.dataset.column;
      if (!key || key === 'image') return;
      onChange({ type: 'sortColumn', value: key });
    });
  }
}