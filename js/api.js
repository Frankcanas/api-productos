const BASE_URL = 'https://dummyjson.com/products';

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories`);
    return await res.json();
}

export async function getProducts(pagina, limite, query = "", categoria = "") {
    const salto = (pagina - 1) * limite;
    let url = `${BASE_URL}?limit=${limite}&skip=${salto}`;

    if (query !== "") {
        url = `${BASE_URL}/search?q=${query}&limit=${limite}&skip=${salto}`;
    } else if (categoria !== "") {
        url = `${BASE_URL}/category/${categoria}?limit=${limite}&skip=${salto}`;
    }

    const res = await fetch(url);
    return await res.json();
}