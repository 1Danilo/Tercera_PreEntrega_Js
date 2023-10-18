let carritoVisible = false;

if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready();
}

function ready(){
    let botonEliminar = document.getElementsByClassName("btn-eliminar");
    for(var i = 0; i < botonEliminar.length; i++){
        let button = botonEliminar[i];
        button.addEventListener("click", eliminarItemCarrito);
    }

    let botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
    for(let i=0; i < botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener("click", sumarCantidad)
    }

    let botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
    for(let i=0; i < botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener("click", restarCantidad)
    }

    let botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
    for(let i = 0; i < botonesAgregarAlCarrito.length;i++){
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener("click", agregarAlCarritoClicked);
    }

    document.getElementsByClassName("btn-pagar")[0].addEventListener("click", pagarClicked)



}


function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    actualizarTotalCarrito();

    ocultarCarrito();

}


function actualizarTotalCarrito() {
    let carritoContenedor = document.querySelector(".carrito");
    let carritoItems = carritoContenedor.querySelectorAll(".carrito-item");
    let total = 0;

    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i];
        let precioElemento = item.querySelector(".carrito-item-precio");
        console.log(precioElemento);

        
        let precio = parseFloat(precioElemento.innerText.replace("$", "").replace(".", ""));
        console.log(precio);
        
        let cantidadItem = item.querySelector(".carrito-item-cantidad");
        let cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);

    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName("carrito-precio-total")[0].innerText = "$" + total.toLocaleString("es") + ",00" ;

}

function ocultarCarrito() {
    let carritoItems = document.querySelector(".carrito-items");

    if (carritoItems.childElementCount > 0) {
        
        let primerElemento = carritoItems.firstElementChild;
        carritoItems.removeChild(primerElemento);
    } else {
        
        let carrito = document.querySelector(".carrito");
        carrito.style.marginRight = "-100%";
        carrito.style.opacity = "0";
        carritoVisible = false;

        let items = document.querySelector(".contenedor-items");
        items.style.width = "100%";
    }
}

function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActualInput = selector.querySelector(".carrito-item-cantidad");
    let cantidadActual = parseInt(cantidadActualInput.value); // Convierte el valor a un número
    console.log(cantidadActual);

    cantidadActual++; 

    
    cantidadActualInput.value = cantidadActual;

    actualizarTotalCarrito();
}

function restarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActualInput = selector.querySelector(".carrito-item-cantidad");
    let cantidadActual = parseInt(cantidadActualInput.value); 
    console.log(cantidadActual);

    cantidadActual--;

    if (cantidadActual >= 1) {
        cantidadActualInput.value = cantidadActual; 
    }
}


function agregarAlCarritoClicked(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName("titulo-item")[0].innerText;
    console.log(titulo);
    let precio = item.getElementsByClassName("precio-item")[0].innerText;
    let imagenSrc = item.getElementsByClassName("img-item")[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);


    hacerVisibleCarrito();

}


function agregarItemAlCarrito(titulo, precio, imagenSrc){

    let item = document.createElement("div");
    item.classList.add = "item";
    let itemsCarrito = document.getElementsByClassName("carrito-items")[0];


    let nombresItemsCarrito = itemsCarrito.getElementsByClassName("carrito-item-titulo");
    for(let i = 0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El Producto ya se encuentra en el carrito")
            return;
        }
    }


    let itemCarritoContenido = `

    <div class="carrito-item">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item)

    item.getElementsByClassName("btn-eliminar")[0].addEventListener("click", eliminarItemCarrito);

    let botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
    botonSumarCantidad.addEventListener("click", sumarCantidad);

    let botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
    botonRestarCantidad.addEventListener("click", restarCantidad);
}

function pagarClicked(event){
    alert("Gracias por tu compra");

    let carritoItems = document.getElementsByClassName("carrito-items")[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    ocultarCarrito();

}

function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "0";
    carrito.style.opacity = "1";

    let items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "60%"

}