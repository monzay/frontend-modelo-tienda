export function sumaDeTodosLosPrecios(carrito: any) {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].price * carrito[i].stock;
    }
    return total;
}
