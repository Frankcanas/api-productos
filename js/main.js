import { getCategories, getProducts } from './api.js';
import { renderProducts, updatePaginationUI, fillCategoriesSelect } from './ui.js';

// Estado de la aplicación
const state = {
    paginaActual: 1,
    limite: 12,
    buscador: document.getElementById('buscador'),
    filtro: document.getElementById('filtro-categoria')
};

async function initApp() {
    // 1. Cargar categorías
    const categorias = await getCategories();
    fillCategoriesSelect(categorias, state.filtro);

    // 2. Carga inicial de productos
    await loadAndDisplay();

    // 3. Configurar Eventos
    setupEventListeners();
}

async function loadAndDisplay() {
    const data = await getProducts(
        state.paginaActual, 
        state.limite, 
        state.buscador.value, 
        state.filtro.value
    );
    
    renderProducts(data.products);
    updatePaginationUI(state.paginaActual, data.total, state.limite);
}

function setupEventListeners() {
    state.buscador.addEventListener('input', () => {
        state.paginaActual = 1;
        loadAndDisplay();
    });

    state.filtro.addEventListener('change', () => {
        state.paginaActual = 1;
        state.buscador.value = ""; 
        loadAndDisplay();
    });

    document.getElementById('btn-anterior').addEventListener('click', () => {
        state.paginaActual--;
        loadAndDisplay();
    });

    document.getElementById('btn-siguiente').addEventListener('click', () => {
        state.paginaActual++;
        loadAndDisplay();
    });
}

// Arrancar
initApp();