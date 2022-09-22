const mostrarProductos = (productos) =>{
  //seleccionamos el contenedor main donde pintamos las cards. 
    const contenedorProductos = document.getElementById("product-container");
    //recorro el array de productos y por cada elemento creo un div le agrego los estilos. Con innerHtml
    //agrego los elemento html al div y luego con append las agregamos
   productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add(".card")
        div.innerHTML += `<div class="card" style="width: 16rem;">
                           <img src="${producto.img}"class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Descripción:${producto.descripcion}</p>
                            <p class="card-text">Precio:$ ${producto.precio}</p>
                            <button class="btn btn-primary" id=boton${producto.id}>Comprar</button>
                          </div>
                        </div>`
        contenedorProductos.appendChild(div);        
        //selecciona el boton de cada producto atraves de su id
        const boton = document.getElementById(`boton${producto.id}`)
        console.log(boton);
        
        boton.addEventListener("click",()=>{
          alert(`Se agrego el produco ${producto.nombre}`)
          agregarProducto(producto);
        })
    });
}

//Agregar al carrito
mostrarProductos(productos);

