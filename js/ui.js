const contenedor = document.getElementById('contenedor-productos');
const infoPagina = document.getElementById('info-pagina');
const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');

export function renderProducts(productos) {
    contenedor.innerHTML = productos.length > 0 
        ? "" 
        : "<p>No se encontraron productos.</p>";

    productos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'producto';
        card.innerHTML = `
            <img src="${p.thumbnail}" alt="${p.title}">
            <span class="categoria-tag">${p.category}</span>
            <h3>${p.title}</h3>
            <p><strong>$${p.price}</strong></p>
        `;
        contenedor.appendChild(card);
    });
}

export function updatePaginationUI(paginaActual, total, limite) {
    infoPagina.innerText = `Página ${paginaActual}`;
    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled = (paginaActual * limite) >= total;
    
    document.getElementById('seccion-paginacion').style.visibility = total > 0 ? "visible" : "hidden";
}

export function fillCategoriesSelect(categorias, selectElement) {
    categorias.forEach(cat => {
        const option = document.createElement('option');
        const slug = typeof cat === 'object' ? cat.slug : cat;
        option.value = slug;
        option.innerText = slug.charAt(0).toUpperCase() + slug.slice(1);
        selectElement.appendChild(option);
    });
}