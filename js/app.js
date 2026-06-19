// Archivo base para estudiantes.
// Objetivo: cargar productos desde JSON, mostrar un producto y validar formularios de forma básica.

let productoEjemplo = null;

fetch("data/productos.json")
  .then(respuesta => respuesta.json())
  .then(datos => {
    productoEjemplo = datos[0];
    mostrarProducto(productoEjemplo);
  })
  .catch(error => {
    console.error("Error al cargar productos.json:", error);
  });

function mostrarProducto(producto) {
  const contenedor = document.getElementById("contenedor-productos");

  contenedor.innerHTML = `
    <div class="producto">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <p><strong>Stock:</strong> ${producto.stock}</p>
    </div>
  `;

  actualizarResumenCompra();
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

document.getElementById("cantidad").addEventListener("input", actualizarResumenCompra);

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
