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
let resultadosDiv = document.querySelector('#resultados');
let buttonAgregar = document.querySelector('#buttonAgregar')
let buttonBuscar = document.querySelector('#buscarProducto')

//MOSTRAR PRODUCTOS
function mostrarProductos() {

    tabla.innerHTML = '';
    let resultado = 0;

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
        
        // Crear fila para cada producto
        let filaProducto = document.createElement('tr');
        filaProducto.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.codigo}</td>
            <td id="botonesacciones"></td>
        `;

        //Calculo resultado
        resultado = resultado + (producto.precio*producto.cantidad)

        let acciones = filaProducto.querySelector('td:last-child')
        acciones.appendChild(botonEliminar);
        acciones.appendChild(botonActualizarCantidad);
        tabla.appendChild(filaProducto);

        //MOSTRAR FORMULARIO DE ACTUALIZAR
        botonActualizarCantidad.addEventListener('click',function(event){

            codigo = producto.codigo

            let overlay = document.createElement('div');
            overlay.id = 'overlay';
        
            let formulario = document.createElement('div');
            formulario.id = 'formulario';
            formulario.innerHTML = `
                <form>
                    <label for="">Ingrese Nueva Cantidad:</label>
                    <input type="number" id="nuevaCantidad"><br><br>
                    <button id="actualizarFormulario">Actualizar</button>
                    <button type="button" id="cerrarFormulario">Cerrar</button>
                </form>
            `;
        
            overlay.appendChild(formulario);
            document.body.appendChild(overlay);
        
            overlay.style.visibility = 'visible';

            document.getElementById('actualizarFormulario').addEventListener('click',function(event){
                //frenar que se actualice la pagina
                event.preventDefault();
                let cantNueva = document.querySelector('#nuevaCantidad').value;
                actualizarCantidadProducto(codigo,cantNueva)
                overlay.style.visibility = 'hidden';
                document.body.removeChild(overlay);
            })
            
        
            document.getElementById('cerrarFormulario').addEventListener('click', function() {
                overlay.style.visibility = 'hidden';
                document.body.removeChild(overlay);
            });
        })
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
        <td id="cvt">
        <button id="botonCtv">Calcular Valor Total</button>
        </td>
    `;
    tabla.appendChild(filaCalcularTotal);

    //CALCULAR VALOR TOTAL
    document.getElementById('botonCtv').addEventListener('click', function() {

        let totalTd = document.getElementById('totalValor');

        if(!totalTd){
            let filaVacia = document.createElement('tr');
        filaVacia.innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td id="totalValor">${resultado}</td>
        `;
        tabla.appendChild(filaVacia);
        }

    });
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

if(nombre && categoria && precio && cantidad && codigo){
    let nuevoProducto = {
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        cantidad: cantidad,
        codigo: codigo
    };
    
    inventario.push(nuevoProducto);

    mostrarProductos();
}else{
    console.log('No hay datos que ingresar')
}

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

//BUSCAR POR CATEGORIA
buttonBuscar.addEventListener('click',function(event){
    let inputCategoria = document.querySelector('#inputCategoria').value
    let productosEncontrados = buscarProductoPorCategoria(inputCategoria)
    // Crear una nueva tabla para mostrar los productos encontrados
    let nuevaTabla = document.createElement('table');
    nuevaTabla.id = 'tablaProductos';
    nuevaTabla.innerHTML = `
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Código</th>
            </tr>
        </thead>
        <tbody id="elementosTabla">
        </tbody>
    `;

    let tbody = nuevaTabla.querySelector('#elementosTabla');

    for (let producto of productosEncontrados) {
        let filaProducto = document.createElement('tr');
        filaProducto.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.codigo}</td>
        `;
        tbody.appendChild(filaProducto);
    }

    resultadosDiv.innerHTML = '';

    resultadosDiv.appendChild(nuevaTabla);
})

function buscarProductoPorCategoria(categoria){
    if (typeof categoria !== 'string') {
        console.log('La categoría debe ser una cadena');
    }
    return inventario.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());;
}

// Mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductos);

//Ejecucion de la funcion Agregar Productos
buttonAgregar.addEventListener('click', agregarProducto);
