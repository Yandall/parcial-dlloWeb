document.getElementById("tipoId").value = "000"
let personas = []
let datos = JSON.parse(localStorage.getItem("lista"))
if(datos != null){
    personas = datos
    actualizarTabla()
}

function crearPersona(){
    let personaTemp = obtenerValores()
    if(!camposVacios() && !existe(personaTemp)){
        console.log("no existe")
        personaTemp.icm = calcularICM(personaTemp.peso, personaTemp.estatura)
        personas.push(personaTemp)
        guardarStorage()
        actualizarTabla()
        limpiarFormulario()
    } else{
        alert("La persona ya existe o faltó llenar un campo")
    }
}

function existe(target){
    let resultado = false;
    personas.forEach(persona => {
        if(persona.id == target.id) {
            resultado = true
        }
    })
    return resultado
}

function obtenerValores(){
    let tipoId = document.getElementById("tipoId").value
    let id = document.getElementById("id").value
    let nombre = document.getElementById("nombre").value
    let apellido = document.getElementById("apellido").value
    let correo = document.getElementById("correo").value
    let peso = document.getElementById("peso").value
    let estatura = document.getElementById("estatura").value
    
    let temporal = {tipoId, id, nombre, apellido, correo, peso, estatura}
    return temporal
}

function camposVacios(){
    let personaTemp = obtenerValores()
    let resultado = false
    if(personaTemp.tipoId == "000" || personaTemp.nombre == "" || personaTemp.apellido == "" || personaTemp.correo == "" || personaTemp.peso == "" || personaTemp.estatura == "") {
        resultado = true
    }
    return resultado
}

function cargarFormulario(indicePersona){
    let personaTemp = personas[indicePersona]
    document.getElementById("tipoId").value = personaTemp.tipoId
    document.getElementById("id").value = personaTemp.id
    document.getElementById("nombre").value = personaTemp.nombre
    document.getElementById("apellido").value = personaTemp.apellido
    document.getElementById("correo").value = personaTemp.correo
    document.getElementById("peso").value = personaTemp.peso
    document.getElementById("estatura").value = personaTemp.estatura
    
    document.getElementById("btnCrearPersona").style.display = "none"
    document.getElementById("btnEditarPersona").style.display = "inline"
    document.getElementById("tipoId").disabled = true
    document.getElementById("id").disabled = true
}

function editarPersona(){
    let personaTemp = obtenerValores()
    if(!camposVacios()){
        let indice = personas.findIndex(element => element.id == personaTemp.id)
        personaTemp.icm = calcularICM(personaTemp.peso, personaTemp.estatura)
        personas.splice(indice, 1, personaTemp)

        document.getElementById("btnCrearPersona").style.display = "inline"
        document.getElementById("btnEditarPersona").style.display = "none"
        document.getElementById("tipoId").disabled = false
        document.getElementById("id").disabled = false
        guardarStorage()
        limpiarFormulario()
        actualizarTabla()
    } else {
        alert("Debes llenar todos los campos")    
    }
}

function eliminarPersona(indice) {
    personas.splice(indice, 1)
    guardarStorage()
    actualizarTabla()
}

function verEstado(indice) {
    let personaTemp = personas[indice]
    if(personaTemp.icm >= 30) alert("Esta persona tiene sobrepeso")
    else alert("Esta persona no tiene sobrepeso")
}

function limpiarFormulario(){
    document.getElementById("tipoId").value = "000"
    document.getElementById("id").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("correo").value = ""
    document.getElementById("peso").value = ""
    document.getElementById("estatura").value = ""    
}


function actualizarTabla(){
    let lista = document.getElementById("listaPersonas")
    personas = JSON.parse(localStorage.getItem("lista"))
    let valores = ""
    for(let i = 0; i < personas.length; i++){
        let persona = personas[i]
        valores += `<tr">`
        valores += `<td>${persona.tipoId} ${persona.id}</td>`
        valores += `<td>${persona.nombre} ${persona.apellido}</td>`
        valores += `<td>${persona.correo}</td>`
        valores += `<td>${persona.peso}</td>`
        valores += `<td>${persona.estatura}</td>`
        valores += `<td>${persona.icm}</td>`
        valores += `<td><button type="button" onclick="cargarFormulario(${i})" class="btn btn-warning btn-sm">Editar</button>`
        valores += `<button type="button" onclick="eliminarPersona(${i})" class="btn btn-danger btn-sm">Eliminar</button> `
        valores += `<button type="button" onclick="verEstado(${i})" class="btn btn-info btn-sm">Ver estado</button> </td>`
        valores += `</tr>`
    }
    lista.innerHTML = valores
}

function calcularICM(peso, estatura){
    return (peso / Math.pow(estatura / 100, 2)).toFixed(1)
}

function guardarStorage(){
    localStorage.setItem("lista", JSON.stringify(personas))
}













