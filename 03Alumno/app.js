var guardar=document.getElementById("agregar");
var borrar=document.getElementById("borrar");
var alumnos=JSON.parse(localStorage.getItem("alumnos")) || [];

guardar.onclick=()=>{
    var nombre=document.getElementById("nombre").value;
    var ap=document.getElementById("ap").value;
    var am=document.getElementById("am").value;
    var g=document.getElementById("g").value;
    var c=document.getElementById("c").value;

    if(nombre.trim()==="" || ap.trim()==="" || am.trim()===""){
        Swal.fire({
            title:"ALUMNOS",
            text:"TIENES CAMPOS VACÍOS, INGRESA VALORES VÁLIDOS",
            icon:"error"
        });
        return;
    }

let alumno={nombre, ap, am, g, c};
alumnos.push(alumno);
localStorage.setItem("alumnos", JSON.stringify(alumnos));
imprimirAlumnos();
limpiar();

}

const imprimirAlumnos=()=>{
    let tablaHTML=`<table class="table table-striped">
    <tr>
    <td>NOMBRE</td>
    <td>APELLIDO MATERNO</td>
    <td>APELLIDO PATERNO</td>
    <td>GRUPO</td>
    <td>CARRERA</td>
    <td>DEL</td>
    <td>EDITAR</td>
    </tr>
    `;
    let index=0;
    alumnos.forEach(a=>{
        tablaHTML+=`
        <tr>
        <td>${a.nombre}</td>
        <td>${a.ap}</td>
        <td>${a.am}</td>
        <td>${a.g}</td>
        <td>${a.c}</td>
        <td><button class="btn btn-danger" onclick="delAlumnos(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
      </svg></button></td>
        <td><button class="btn btn-info" onclick="mostrarAlumnos(${index})"  data-bs-toggle="modal" data-bs-target="#actualizarR"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
      </svg></button></td>
        </tr>
        `;
        index++;
    });
    document.getElementById("res").innerHTML=tablaHTML;
}

const limpiar=()=>{
    document.getElementById("nombre").value="";
    document.getElementById("ap").value="";
    document.getElementById("am").value="";
    document.getElementById("g").selectedIndex=0;
    document.getElementById("c").selectedIndex=0;
}

function delAlumnos(index){
    Swal.fire({
        title:"¿Estás seguro de eliminar a este alumno?",
        showDenyButtonText:true,
        confirmButton:"Si, eliminar",
        denyButtonText:"No estoy seguro"
    }).then((resultado)=>{
        if(resultado.isConfirmed){
            alumnos.splice(index, 1);
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            imprimirAlumnos();
            Swal.fire("El alumno ha sido eliminado con éxito", "", "success");
        }
    });
}

var indiceAlumno;
function mostrarAlumnos(index){
    indiceAlumno=index;
    var alumno=alumnos[index];
    document.getElementById("nom").value=alumno.nombre;
    document.getElementById("apa").value=alumno.ap;
    document.getElementById("ama").value=alumno.am;
    document.getElementById("gr").value=alumno.g;
    document.getElementById("ca").value=alumno.c;
    document.getElementById("actualizarR").style.display="block";

}

var actualizar=document.querySelector("#actualizarR");

actualizar.onclick=()=>{
    var alumno=alumnos[indiceAlumno];
    alumno.nombre=document.getElementById("nom").value;
    alumno.ap=document.getElementById("apa").value;
    alumno.am=document.getElementById("ama").value;
    alumno.g=document.getElementById("gr").value;
    alumno.c=document.getElementById("ca").value;

    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    imprimirAlumnos();
    limpiar();
}