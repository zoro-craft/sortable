// imports the other files and use them together

import { loadHeroes } from './fetch.js';
import { searchHeroes, sortHeroes, getPage, getTotalPages } from './sort.js';
import { renderAll, bindEvents } from './dom.js';

const state = {
  allHeroes: [],
  pageNumber: 1,
  itemsPerPage: 20,
  searchText: '',
  sortKey: 'name',
  sortOrder: 'asc'
};

// take the current state, run search + sort + paginate, return what dom.js needs
function buildView() {
  const found = searchHeroes(state.allHeroes, state.searchText);
  const sorted = sortHeroes(found, state.sortKey, state.sortOrder);
  const totalPages = getTotalPages(sorted.length, state.itemsPerPage);

  if (state.pageNumber > totalPages) state.pageNumber = 1;

  const rows = getPage(sorted, state.itemsPerPage, state.pageNumber);

  return {
    rows: rows,
    page: state.pageNumber,
    totalPages: totalPages,
    sortKey: state.sortKey,
    sortOrder: state.sortOrder
  };
}

function refresh() {
  renderAll(buildView());
}

// called by dom.js whenever the user does something
function handleChange(action) {
  if (action.type === 'search') {
    state.searchText = action.value;
    state.pageNumber = 1;
  } else if (action.type === 'pageSize') {
    state.itemsPerPage = action.value;
    state.pageNumber = 1;
  } else if (action.type === 'pageStep') {
    state.pageNumber = state.pageNumber + action.value;
  } else if (action.type === 'sortColumn') {
    if (state.sortKey === action.value) {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = action.value;
      state.sortOrder = 'asc';
    }
  }
  refresh();
}

// start the app
async function start() {
  bindEvents(handleChange);

  try {
    const heroes = await loadHeroes();
    state.allHeroes = heroes;
    refresh();
  } catch (err) {
    console.error('Failed to get data:', err);
  }
}

start();