// Archivo base para estudiantes.
// Objetivo: cargar productos desde JSON, mostrar productos y validar formularios de forma básica.

let productoEjemplo = null;

fetch("data/productos.json")
  .then(respuesta => respuesta.json())
  .then(datos => {
    // Se guarda el primer producto para el resumen de compra
    productoEjemplo = datos[0];

    // Se muestran todos los productos
    mostrarProductos(datos);

    // Se actualiza el resumen inicial
    actualizarResumenCompra();
  })
  .catch(error => {
    console.error("Error al cargar productos.json:", error);
  });

function mostrarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");

  contenedor.innerHTML = "";

  productos.forEach(producto => {
    contenedor.innerHTML += `
      <div class="producto">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
      </div>
    `;
  });
}

function actualizarResumenCompra() {
  if (productoEjemplo === null) {
    return;
  }

  const cantidad = Number(document.getElementById("cantidad").value);
  const total = productoEjemplo.precio * cantidad;

  document.getElementById("resumenCompra").textContent =
    `Producto: ${productoEjemplo.nombre} | Cantidad: ${cantidad} | Total: $${total}`;

  document.getElementById("detalleProducto").value =
    `Producto: ${productoEjemplo.nombre} | Cantidad: ${cantidad} | Total: $${total}`;
}

// Actualiza el resumen cuando cambia la cantidad
document.getElementById("cantidad").addEventListener("input", actualizarResumenCompra);

// Formulario de compra
document.getElementById("formCompra").addEventListener("submit", function(event) {
  const nombre = document.getElementById("nombreCompra").value.trim();
  const correo = document.getElementById("correoCompra").value.trim();
  const cantidad = Number(document.getElementById("cantidad").value);

  if (nombre === "" || correo === "" || cantidad <= 0) {
    event.preventDefault();
    alert("Debe completar nombre, correo y una cantidad válida.");
  }

  // TODO estudiante:
  // Mejorar validación de correo.
  // Validar que la cantidad no supere el stock.
  // Mostrar mensajes de error en la página, no solo con alert.
});

// Formulario de contacto
document.getElementById("formContacto").addEventListener("submit", function(event) {
  const nombre = document.getElementById("nombreContacto").value.trim();
  const correo = document.getElementById("correoContacto").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (nombre === "" || correo === "" || mensaje === "") {
    event.preventDefault();
    alert("Debe completar todos los campos del formulario de contacto.");
  }

  // TODO estudiante:
  // Validar formato del correo.
  // Validar cantidad mínima de caracteres en el mensaje.
  // Mostrar mensajes de error junto a cada campo.
});
