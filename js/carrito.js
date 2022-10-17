//Array vacio que se va llenando a medida q agregamos prod atraves de la funcion agregarProductos
let carritoCompras = [];
let btnVaciar = document.getElementById("btn-vaciar");
let contenedorCarrito = document.getElementById("carrito-contenedor");
let contadorCarrito = document.getElementById("contador-carrito");
let precioTotal = document.getElementById("precio-total");
let cantidad;

//agregamos el producto atraves de su id
const agregarProducto = (prodId) => {
  //verifico si el producto ya existe, si es asi aumento la cantidad 
   //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
   const existe = carritoCompras.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

   if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
       const prod = carritoCompras.map (prod => { //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
           // map encuentre cual es el q igual al que está agregado, le suma la cantidad
           if (prod.id === prodId){
               prod.cantidad++
               
           }
       })
   } else { //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL PRODUCTO AL CARRITO
       const item = productos.find((prod) => prod.id === prodId)//Trabajamos con las ID
       //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
       carritoCompras.push(item)
   }
   //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
   //el carrito y se ve.
   actualizarCarrito() //LLAMAMOS A LA FUNCION CADA VEZ Q SE MODIFICA EL CARRITO
 
   /*let prod = productos.find(prod => prod === prodId)
    carritoCompras.push(prod);
    localStorage.setItem("carrito", JSON.stringify(carritoCompras));
    actualizarCarrito(); */
  }

//vaciar localstorage y carrito
btnVaciar.addEventListener("click", () => {
  localStorage.clear();
  carritoCompras = [];
  actualizarCarrito();
})

//actualizar carrito
const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carritoCompras.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>${producto.nombre}</p>
                     <p>Precio: $ ${producto.precio}</p> 
                     <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>                
                     <button onclick="eliminarProducto(${producto.id})" class="boton-eliminar" ><i class="fa-solid fa-trash-can"></i></button>`;
    contenedorCarrito.appendChild(div)
  })
  //aumento la cantidad de elementos en el carrito
  contadorCarrito.innerText = carritoCompras.length;
  //usamos el metodo reduce para acumular el precio total de la compra
  precioTotal.innerText = carritoCompras.reduce((acumulador, prod) => acumulador + prod.precio, 0);
  console.log(precioTotal)
}

/*eliminar producto*/
const eliminarProducto = (prodId) => {
  const findProd = carritoCompras.find(producto => producto.id === prodId);
  //obtenemos el indice del prodcuto con indexOf
  const indice = carritoCompras.indexOf(findProd);
  carritoCompras.splice(indice, 1);
  actualizarCarrito();
}

//pedir los productos por fetch 
const getData = async () => {
  let response = await fetch("./productos.json")
  let data = await response.json()

  data.forEach(item => {
    console.log(`${item.nombre}`)
  })
}

getData();