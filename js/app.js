// =====================================================
// Constantes y referencias al DOM
// =====================================================
const API_BASE = 'https://rickandmortyapi.com/api/location';

const form        = document.getElementById('search-form');
const inputName   = document.getElementById('input-name');
const inputType   = document.getElementById('input-type');
const btnSearch   = document.getElementById('btn-search');
const resultsGrid = document.getElementById('results-grid');
const statusMsg   = document.getElementById('status-msg');
const formWarning = document.getElementById('form-warning');

// =====================================================
// R4 — Petición con fetch, async/await y URL + searchParams
// =====================================================
const fetchLocations = async (name, type) => {
  const url = new URL(API_BASE);

  if (name) url.searchParams.set('name', name);
  if (type) url.searchParams.set('type', type);

  const response = await fetch(url);

  if (response.status === 404) return null; // sin resultados

  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

  const data = await response.json();
  return data.results;
};

// =====================================================
// R6 — Crear una tarjeta con createElement / textContent
// =====================================================
const createCard = (location) => {
  const resolveValue = (val) =>
    (!val || val.toString().trim() === '' || val.toString().toLowerCase() === 'unknown')
      ? 'Desconocido'
      : val.toString();

  const card = document.createElement('article');
  card.className = 'card';

  // Nombre
  const name = document.createElement('p');
  name.className = 'card-name';
  name.textContent = resolveValue(location.name);

  // Tipo
  const detailType = buildDetailRow('Tipo', resolveValue(location.type));

  // Dimensión
  const detailDim = buildDetailRow('Dimensión', resolveValue(location.dimension));

  // Residentes
  const residents = document.createElement('p');
  residents.className = 'card-residents';
  const count = document.createElement('strong');
  count.textContent = location.residents.length;
  residents.textContent = 'Residentes: ';
  residents.appendChild(count);

  card.appendChild(name);
  card.appendChild(detailType);
  card.appendChild(detailDim);
  card.appendChild(residents);

  return card;
};

// Función auxiliar para filas de detalle
const buildDetailRow = (label, value) => {
  const row = document.createElement('p');
  row.className = 'card-detail';

  const labelSpan = document.createElement('span');
  labelSpan.textContent = label;

  const valueSpan = document.createElement('span');
  valueSpan.textContent = value;

  row.appendChild(labelSpan);
  row.appendChild(valueSpan);
  return row;
};

// =====================================================
// Mostrar / ocultar mensajes de estado — R7
// =====================================================
const showStatus = (text, isError = false) => {
  statusMsg.textContent = text;
  statusMsg.className = isError ? 'status-msg error' : 'status-msg';
  statusMsg.hidden = false;
};

const hideStatus = () => {
  statusMsg.hidden = true;
  statusMsg.textContent = '';
};

const clearResults = () => {
  resultsGrid.innerHTML = '';
};

// =====================================================
// R8 — Persistencia en localStorage
// =====================================================
const STORAGE_KEY = 'rm_last_search';

const saveToStorage = (name, type) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, type }));
};

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// =====================================================
// Función principal de búsqueda
// =====================================================
const performSearch = async (name, type) => {
  // R7 — deshabilitar botón y mostrar "Buscando…"
  btnSearch.disabled = true;
  btnSearch.textContent = 'Buscando…';
  clearResults();
  hideStatus();

  try {
    const results = await fetchLocations(name, type);

    if (results === null) {
      // R7 — sin resultados (404)
      showStatus('No se encontraron ubicaciones con esos criterios.');
      return;
    }

    // R6 — renderizar tarjetas
    results.forEach((location) => {
      resultsGrid.appendChild(createCard(location));
    });

  } catch (err) {
    // R7 — error de red u otro
    showStatus(`No se pudo completar la búsqueda: ${err.message}`, true);
  } finally {
    // R7 — siempre restaurar el botón
    btnSearch.disabled = false;
    btnSearch.textContent = 'Buscar';
  }
};

// =====================================================
// R5 — Manejar el envío del formulario
// =====================================================
form.addEventListener('submit', (event) => {
  event.preventDefault();

  formWarning.hidden = true;

  const name = inputName.value.trim();
  const type = inputType.value.trim();

  // R5 — aviso si no hay ningún criterio
  if (!name && !type) {
    formWarning.hidden = false;
    return;
  }

  // R8 — guardar búsqueda
  saveToStorage(name, type);

  performSearch(name, type);
});

// =====================================================
// R8 — Restaurar última búsqueda al cargar la página
// =====================================================
const init = () => {
  const saved = loadFromStorage();

  if (saved) {
    inputName.value = saved.name ?? '';
    inputType.value = saved.type ?? '';

    if (saved.name || saved.type) {
      performSearch(saved.name ?? '', saved.type ?? '');
    }
  }
};

init();
