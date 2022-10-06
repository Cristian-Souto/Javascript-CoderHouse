//Array vacio que se va llenando a medida q agregamos prod atraves de la funcion agregarProductos
let carritoCompras = [];
let btnVaciar = document.getElementById("btn-vaciar");
let contenedorCarrito = document.getElementById("carrito-contenedor");
let contadorCarrito = document.getElementById("contador-carrito");
let cantidad;

//agregamos el producto atraves de su id
const agregarProducto = (prodId) => {
  //verifico si el producto ya existe, si es asi aumento la cantidad 
  /* const productoExiste = carritoCompras.some(prod => prod.id === prodId) */

  let prod = productos.find(prod => prod === prodId)
  carritoCompras.push(prod);
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carritoCompras));
  /* console.log(carritoCompras) */
}
//vaciar localstorage

btnVaciar.addEventListener("click", () => {
  localStorage.clear();
  carritoCompras = [];
})

/*eliminar producto

const eliminarProducto = (prodId) =>{
  const findProd = carritoCompras.find(producto => producto.id === prodId);
  //obtenemos el indice del prodcuto con indexOf
  const indice = carritoCompras.indexOf(findProd);
  carritoCompras.splice(indice,1);
  actualizarCarrito();
}
*/

//actualizar carrito
const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carritoCompras.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>${producto.nombre}</p>
                     <p>Precio: $ ${producto.precio}</p> 
                     <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>                
                     <button id="eliminar${producto.id}" class="boton-eliminar" ><i class="fa-solid fa-trash-can"></i></button>`;
    contenedorCarrito.appendChild(div)
  })
  //aumento la cantidad de elementos en el carrito
  contadorCarrito.innerText = carritoCompras.length;

}
const getData = async () => {
  let response = await fetch("./productos.json")
  let data = await response.json()

  data.forEach(item => {
    console.log(`${item.nombre}`)
  })
}

getData();