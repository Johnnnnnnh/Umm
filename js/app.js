// Archivo base para estudiantes.
// Objetivo: cargar productos desde JSON, mostrar productos y validar formularios de forma básica.

let productos = [];
let carrito = [];

// Cargar productos desde JSON
fetch("data/productos.json")
  .then(respuesta => respuesta.json())
  .then(datos => {
    productos = datos;
    mostrarProductos(productos);
    actualizarResumenCompra();
  })
  .catch(error => {
    console.error("Error al cargar productos.json:", error);
  });

// Mostrar productos en tarjetas
function mostrarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    contenedor.innerHTML += `
      <div class="producto">
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
        <p>${producto.descripcion}</p>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      </div>
    `;
  });
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  const item = carrito.find(p => p.id === idProducto);
  if (item) {
    if (item.cantidad < producto.stock) {
      item.cantidad++;
    } else {
      mostrarError("nombreCompra", "No hay suficiente stock disponible.");
    }
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarResumenCompra();
}

// Actualizar resumen de compra
function actualizarResumenCompra() {
  const resumen = document.getElementById("resumenCompra");
  const listaCarrito = document.getElementById("listaCarrito");
  const totalCarrito = document.getElementById("totalCarrito");

  // Limpiar campos ocultos de ítems anteriores
  document.querySelectorAll(".item-carrito-hidden").forEach(el => el.remove());

  if (carrito.length === 0) {
    resumen.textContent = "Carrito vacío.";
    if (listaCarrito) listaCarrito.innerHTML = "";
    if (totalCarrito) totalCarrito.textContent = "Total: $0";
    return;
  }

  let total = 0;
  if (listaCarrito) listaCarrito.innerHTML = "";

  const form = document.getElementById("formCompra");

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    // Un campo oculto por ítem → FormSubmit lo muestra como fila separada en el correo
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = `item_${index + 1}_${item.nombre}`;
    input.value = `Cantidad: ${item.cantidad} | Precio unitario: $${item.precio} | Subtotal: $${subtotal}`;
    input.classList.add("item-carrito-hidden");
    form.appendChild(input);

    if (listaCarrito) {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} x${item.cantidad} = $${subtotal}`;
      listaCarrito.appendChild(li);
    }
  });

  // Campo separado para el total
  const inputTotal = document.createElement("input");
  inputTotal.type = "hidden";
  inputTotal.name = "total_compra";
  inputTotal.value = `$${total}`;
  inputTotal.classList.add("item-carrito-hidden");
  form.appendChild(inputTotal);

  resumen.textContent = `Total: $${total}`;
  if (totalCarrito) totalCarrito.textContent = `Total: $${total}`;
}

// Función independiente para vaciar carrito
function vaciarCarrito() {
  carrito = [];
  actualizarResumenCompra();
}

// Mostrar error junto a un campo
function mostrarError(idCampo, mensaje) {
  const campo = document.getElementById(idCampo);
  let error = campo.nextElementSibling;
  if (!error || !error.classList.contains("error")) {
    error = document.createElement("span");
    error.classList.add("error");
    campo.insertAdjacentElement("afterend", error);
  }
  error.textContent = mensaje;
}

// Validaciones del formulario de compra
document.getElementById("formCompra").addEventListener("submit", function(event) {
  const nombre = document.getElementById("nombreCompra").value.trim();
  const correo = document.getElementById("correoCompra").value.trim();

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  if (nombre === "" || !correoValido || carrito.length === 0) {
    event.preventDefault();
    if (nombre === "") mostrarError("nombreCompra", "Debe ingresar su nombre.");
    if (!correoValido) mostrarError("correoCompra", "Correo inválido.");
    if (carrito.length === 0) alert("Debe agregar al menos un producto al carrito.");
  }
});

// Validaciones del formulario de contacto
document.getElementById("formContacto").addEventListener("submit", function(event) {
  const nombre = document.getElementById("nombreContacto").value.trim();
  const correo = document.getElementById("correoContacto").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  if (nombre === "" || !correoValido || mensaje.length < 20) {
    event.preventDefault();
    if (nombre === "") mostrarError("nombreContacto", "Debe ingresar su nombre.");
    if (!correoValido) mostrarError("correoContacto", "Correo inválido.");
    if (mensaje.length < 20) mostrarError("mensaje", "El mensaje debe tener al menos 20 caracteres.");
  }
});


