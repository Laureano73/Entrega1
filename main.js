const nombreUsuario = prompt('Ingrese su nombre:');
const nombreRecibo = nombreUsuario;
alert('¡Bienvenido a Supermercados LM, ' + nombreUsuario + '!');

const comprarProductos = () => {
    let producto = '';
    let cantidad = 0;
    let precio = 0;
    let subtotal = 0;
    let carrito = [];

    do {
        producto = prompt('¿Qué producto desea añadir al carrito? Fideos, Pan, Queso o Arroz');
        cantidad = parseInt(prompt('¿Cuántos productos de este mismo quiere comprar?'));

        let cantidadValidada = validarCantidad(cantidad);

        const productoEncontrado = productos.find((prod) => prod.nombre === producto.toLowerCase());

        if (productoEncontrado) {
            precio = productoEncontrado.precio;
        } else {
            alert('Algún dato que usted ingresó no es correcto');
            precio = 0;
            cantidadValidada = 0;
        }

        subtotal += precio * cantidadValidada;

        carrito.push({
            producto: producto,
            cantidad: cantidadValidada,
            precioPorUnidad: precio
        });

        seguirComprando = confirm('¿Desea seguir comprando?');
    } while (seguirComprando);

    return {
        subtotal: subtotal,
        carrito: carrito
    };
};

const validarCantidad = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad === 0) {
        alert('¡Tienes que agregar una cantidad válida!');
        cantidad = parseInt(prompt('¿Cuántos queres comprar?'));
    }

    return cantidad;
};

const mostrarDetalleCompra = (carrito, nombreRecibo, subtotal) => {
    let mensaje = 'Detalle de la compra de ' + nombreRecibo + ':\n\n';
    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        let totalItem = item.cantidad * item.precioPorUnidad;
        let totalItemConIVA = totalItem * (1 + IVA);
        mensaje += 'Producto: ' + item.producto + '\nCantidad: ' + item.cantidad + '\nPrecio por unidad(sin IVA): $' + item.precioPorUnidad + '\nTotal (sin IVA): $' + totalItem.toFixed(2) + '\nTotal con IVA: $' + totalItemConIVA.toFixed(2) + '\n\n';
    }
    mensaje += 'Subtotal: $' + subtotal.toFixed(2);
    alert(mensaje);
};

const eliminarProducto = (carrito) => {
    let productoEliminar = prompt('Ingrese el nombre del producto que desea eliminar del carrito:');

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].producto.toLowerCase() === productoEliminar.toLowerCase()) {
            const precioProductoEliminar = carrito[i].precioPorUnidad;
            const cantidadProductoEliminar = carrito[i].cantidad;
            carrito.splice(i, 1);

            // Actualiza el subtotal al eliminar el producto
            subtotal -= precioProductoEliminar * cantidadProductoEliminar;

            return;
        }
    }

    alert('El producto ingresado no se encuentra en el carrito.');
};

const IVA = 0.21;

let resultadoCompra = comprarProductos();
let subtotal = resultadoCompra.subtotal;
let carrito = resultadoCompra.carrito;

mostrarDetalleCompra(carrito, nombreRecibo, subtotal);

let opcionPago = prompt('¿Cómo desea pagar? Tarjeta o Efectivo con un 10% de descuento');
let totalConDescuento = 0;

if (opcionPago.toLowerCase() === 'efectivo') {
    const porcentajeDescuento = 10;
    const descuento = subtotal * (porcentajeDescuento / 100);
    totalConDescuento = subtotal - descuento;
    totalConDescuentoIVA = totalConDescuento * (1 + IVA);

    alert('¡Felicitaciones! Por pagar en efectivo, has obtenido un descuento del ' + porcentajeDescuento + '%');
    alert('El total de tu compra con descuento es: $' + totalConDescuentoIVA.toFixed(2));
} else if (opcionPago.toLowerCase() === 'tarjeta') {
    totalConDescuento = subtotal;
    totalConDescuentoIVA = totalConDescuento * (1 + IVA);

    alert('El total de tu compra es: $' + totalConDescuentoIVA.toFixed(2));
} else {
    alert('Opción de pago no válida. Se calculará el total sin descuento en efectivo.');
    totalConDescuento = subtotal;
    totalConDescuentoIVA = totalConDescuento * (1 + IVA);

    alert('El total de tu compra es: $' + totalConDescuentoIVA.toFixed(2));
}
let eliminar = confirm('¿Desea eliminar algún producto del carrito?');
while (eliminar) {
    eliminarProducto(carrito);
    mostrarDetalleCompra(carrito, nombreRecibo, subtotal); // Pasar el nombre del recibo y el subtotal actualizado
    eliminar = confirm('¿Desea eliminar otro producto del carrito?');
}

