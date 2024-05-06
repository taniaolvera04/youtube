var productos=["Pepper","Takis","Coca","Nescafe","Vuala"];
var precios=[20,18,25,42,20];

var selectProductos=document.getElementById("productos");
var imgProductos=document.getElementById("imgProducto");
var precioProductos=document.getElementById("precioProductos");
var inputCantidad=document.getElementById("inputCantidad");
var agregarCarrito=document.getElementById("agregarCarrito");

var carrito=new Array();

var posProducto=-1;
var cantidadProducto=0;
var pagar=0;
var totalp=0;
var cambio=0;

const cargarProductos=()=>{
let optionProductos="";
productos.forEach((producto)=>{
    optionProductos+=`<option value="${producto}">${producto.toUpperCase()}</option>`;
})
selectProductos.innerHTML=optionProductos;
cargarPrecio();
}

selectProductos.onchange=()=>{
    cargarPrecio();
}

const cargarPrecio=()=>{
    imgProductos.src=`productos/${selectProductos.value.toLowerCase()}.png`;
    precioProductos.innerHTML=`$ ${precios[selectProductos.selectedIndex]}`;
    posProducto=selectProductos.selectedIndex;
}

inputCantidad.oninput=()=>{
    document.getElementById("vcantidad").innerHTML=inputCantidad.value;
    cantidadProducto=parseInt(inputCantidad.value);
}


agregarCarrito.onclick=()=>{

    cantidadProducto=parseInt(inputCantidad.value);
    if(checarProducto(posProducto, cantidadProducto)) {
        imprimirTabla();
    }
    else{
        let item=new Array();
        item.push(posProducto);
        item.push(cantidadProducto);
        carrito.push(item);
        imprimirTabla();
    }
}

const checarProducto=(pos, cant)=>{
    let x=false;
    carrito.forEach(item=>{
if(item[0]==pos){
    item[1]=item[1]+cant;
    x=true;
}
    });
    return x;
}

const imprimirTabla=()=>{
    let total=0;
    let divCarrito=document.getElementById("carrito");
    let tablaHTML=`<table class="table w-100 m-auto">
    <tr>
    <td>IMAGEN</td>
    <td>PRODUCTO</td>
    <td>PRECIO</td>
    <td>CANTIDAD</td>
    <td>IMPORTE</td>
    <td>*</td>
    </tr>
    `;
    let index=0;
    carrito.forEach(item=>{
        tablaHTML+=`
        <tr>
        <td><img src="productos/${productos[item[0]].toLowerCase()}.png" height="40px"></td>
        <td>${productos[item[0]]}</td>
        <td>${precios[item[0]]}.00</td>
        <td>${item[1]}</td>
        <td>${(precios[item[0]]*item[1])}</td>
        <td><button class="btn btn-danger" onclick="eliminarProducto(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
      </svg></button></td>
      </tr>
        `
        index++;
        total+=(precios[item[0]]*item[1]);
        totalp=total;
    })
    let cambio=0;
    tablaHTML+=`
    <tr>
    <td></td>
    <td></td>
    <td><h3>TOTAL</h3></td>
    <td><h3>$${total}.00</h3></td>
    <td><button onclick="pagarProducto(${pagar})" class="btn btn-primary">PAGAR</button></td>
    </tr>
    `
    divCarrito.innerHTML=tablaHTML;
}

const eliminarProducto=(index)=>{
    Swal.fire({
        title:"¿Estás seguro de eliminar este producto?",
        showDenyButton:true,
        confirmButtonText:"Si, eliminar",
        denyButtonText:"No estoy seguro"
    }).then(resultado=>{
        if(resultado.isConfirmed){
            carrito.splice(index, 1);
            imprimirTabla();
            Swal.fire("El producto ha sido eliminado", "", "success");
        }
    });

}

const pagarProducto=()=>{
    Swal.fire({
        title: 'Total a pagar $'+totalp,
        input: 'text',
        inputPlaceholder:'Ingrese cantidad a pagar ',
        showCancelButton:true,
        confirmButtonText:'Enviar',
        cancelButtonText:'Cancelar'
        
        }).then(result=>{
            if(result.isConfirmed){
                const pago=result.value;
                if(pago>=totalp){
                    let cambio=pago-totalp;
                    Swal.fire({
                        title:"Gracias Por Tu Compra",
                        text:"Tu cambio es de: $"+cambio,
                        icon:"success"
                    });
                  desaparecerT();
                }else{
                    Swal.fire({
                        title:"Ingresa una cantidad válida",
                        text:"Inténtalo de nuevo",
                        icon:"error"
                    });
                }
                
            }
        });
}

const verProductos=()=>{
    let divListaProductos=document.getElementById("listaProductos");
    let tablaHTML=`
    <table class="table w-100 m-auto">
    <tr>
    <td>PRODUCTO</td>
    <td>PRECIO</td>
    <td>DEL</td>
    </tr>
    `;
    let index=0;
    productos.forEach(item=>{
        tablaHTML+=`
        <tr>
    <td>${item}</td>
    <td>$ ${precios[index]}.00</td>
    <td><button class="btn btn-danger" onclick="delProductos(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
  </svg></button></td>
    </tr>
        `
index++;
    })
    divListaProductos.innerHTML=tablaHTML;
}

const addProductos=()=>{
    let nombre=document.getElementById('nombreProducto').value;
    let precio=document.getElementById('pProducto').value;
    productos.push(nombre);
    precios.push(precio);
    cargarProductos();
    verProductos();
}

delProductos=(index)=>{
    let divListaProductos=document.getElementById("listaProductos");
    Swal.fire({
        title:"¿Estás seguro de eliminar este producto?",
        showDenyButton:true,
        confirmButtonText:"Si, eliminar",
        denyButtonText:"No estoy seguro"
    }).then(resultado=>{
        if(resultado.isConfirmed){
            productos.splice(index, 1);
            precios.splice(index, 1);
            verProductos();
            cargarProductos();

            Swal.fire("El producto ha sido eliminado", "", "success");
        }
    });
}

const desaparecerT=()=>{
    carrito=[];
    document.getElementById("carrito").innerHTML="";
}