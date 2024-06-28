// Datos Iniciales
let inventario = [
    {
        nombre: "Laptop",
        categoria: "Electrónica",
        precio: 1000,
        cantidad: 10,
        codigo: "P001"
    },
    {
        nombre: "Smartphone",
        categoria: "Electrónica",
        precio: 700,
        cantidad: 25,
        codigo: "P002"
    },
    {
        nombre: "Teclado",
        categoria: "Accesorios",
        precio: 50,
        cantidad: 50,
        codigo: "P003"
    },
    {
        nombre: "Monitor",
        categoria: "Electrónica",
        precio: 300,
        cantidad: 15,
        codigo: "P004"
    },
    {
        nombre: "Silla de Oficina",
        categoria: "Muebles",
        precio: 150,
        cantidad: 20,
        codigo: "P005"
    }
];

//----------------------------------------//

let tabla = document.querySelector('#elementosTabla');
let buttonAgregar = document.querySelector('#buttonAgregar')

//MOSTRAR PRODUCTOS
function mostrarProductos() {

    tabla.innerHTML = '';

    for (let producto of inventario) {

        //Creacion de boton eliminar
        let botonEliminar = document.createElement("button")
        botonEliminar.textContent="Eliminar"
        //Ejecucion de la funcion Eliminar Productos
        botonEliminar.addEventListener('click', function() {
            eliminarProducto(producto.codigo);
        });

        let botonActualizarCantidad = document.createElement("button")
        botonActualizarCantidad.textContent="Modificar Cantidad"

        //Mostrar input de actualizar
        botonActualizarCantidad.addEventListener('click',function(){
            //-----//
        })
        
        // Crear fila para cada producto
        let filaProducto = document.createElement('tr');
        filaProducto.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.codigo}</td>
            <td>

            </td>
        `;

        let acciones = filaProducto.querySelector('td:last-child')
        acciones.appendChild(botonEliminar);
        acciones.appendChild(botonActualizarCantidad);
        tabla.appendChild(filaProducto);
    }

    // Crear fila para el botón "Calcular Valor Total"
    let filaCalcularTotal = document.createElement('tr');
    filaCalcularTotal.innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
        <button>Calcular Valor Total</button>
        </td>
    `;
    tabla.appendChild(filaCalcularTotal);

    // Crear fila vacía
    let filaVacia = document.createElement('tr');
    filaVacia.innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    `;
    tabla.appendChild(filaVacia);
    
}

//AGREGAR PRODUCTOS
function agregarProducto(event){

//frenar que se actualice la pagina
event.preventDefault();

//Obtencion de datos del formulario
let nombre = document.querySelector("#nombreProducto").value
let categoria = document.querySelector("#categoriaProducto").value
let precio = document.querySelector("#precioProducto").value
let cantidad = document.querySelector("#cantidadProducto").value
let codigo = document.querySelector("#codigoProducto").value

let nuevoProducto = {
    nombre: nombre,
    categoria: categoria,
    precio: precio,
    cantidad: cantidad,
    codigo: codigo
};

inventario.push(nuevoProducto);

mostrarProductos();

}

//ELIMINAR PRODUCTOS
function eliminarProducto(codigo) {
    inventario = inventario.filter(producto => producto.codigo !== codigo);
    mostrarProductos();
}

//ACTUALIZAR CANTIDAD DE PRODUCTO
function actualizarCantidadProducto(codigo, cantNueva){
    let producto = inventario.find(elemento => elemento.codigo==codigo)
    if(producto){
        producto.cantidad=cantNueva
        mostrarProductos()
    }else{
        console.log("NO se encontro el producto")
    }
}

// Mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductos);

//Ejecucion de la funcion Agregar Productos
buttonAgregar.addEventListener('click', agregarProducto);
