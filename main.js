alert('!Bienvenido a Supermercados LM!')

const comprarProductos = () => {
    let producto = ''
    let cantidad = 0
    let precio = 0
    let subtotal = 0
    let seguirComprando = true

    do {
        producto = prompt('¿Qué producto desea añadir al carrito? Fideos, Pan o Queso')
        cantidad = parseInt(prompt('¿Cuantos productos de este mismo quiere comprar?'))

        let cantidadValidada = validarCantidad(cantidad)

        switch (producto) {
            case 'fideos':
                precio = 530
                break;
            case 'pan':
                precio = 340
                break;
            case 'queso':
                precio = 870
                break;
            default:
                alert('Algún dato que usted ingreso no es correcto')
                precio = 0
                cantidadValidada = 0
        }

        subtotal += precio * cantidadValidada

        seguirComprando = confirm('¿Desea seguir comprando?')
    } while (seguirComprando);

    return subtotal
}

const validarCantidad = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad === 0) {
        alert('!Tenes que agregar una cantidad valida!')
        cantidad = parseInt(prompt('¿Cuantos queres comprar?'))
    }

    return cantidad
}

let total = comprarProductos()

alert('El total de tu compra es: ' + total)

