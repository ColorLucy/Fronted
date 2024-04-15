export async function consultarProductos(config) {
  const data = await fetch(
    `http://127.0.0.1:8000/products/view-products/`,
    config
  );
  console.log(data);
  return data.json();
}

export async function consultarDetalles(config) {
  const data = await fetch(
    `http://127.0.0.1:8000/products/view-details/`,
    config
  );
  console.log(data);
  return data.json();
}

export async function consultarImagenes(config) {
  const data = await fetch(
    `http://127.0.0.1:8000/products/view-products/`,
    config
  );
  console.log(data);
  return data.json();
}
