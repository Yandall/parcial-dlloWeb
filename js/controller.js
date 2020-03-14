console.log("prubea")
document.getElementById("tipoId").value = "000"

let personas = [
]

function crearPersona(){
    let personaTemp = obtenerValores()
    if(!existe(personaTemp)){
        console.log("no existe")
        let ICM = personaTemp.peso / Math.pow(personaTemp.estatura / 100, 2)
        personaTemp.icm = ICM.toFixed(1)
        personas.push(personaTemp)
        actualizarTabla()
    } else{
        console.log("existe")
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

function cargarFormulario(idPersona){
    let personaTemp = personas.find(element => element.id = idPersona)
    document.getElementById("tipoId").value = personaTemp.tipoId
    document.getElementById("id").value = personaTemp.id
    document.getElementById("nombre").value = personaTemp.nombre
    document.getElementById("apellido").value = personaTemp.apellido
    document.getElementById("correo").value = personaTemp.correo
    document.getElementById("peso").value = personaTemp.peso
    document.getElementById("estatura").value = personaTemp.estatura
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
    let valores = ""
    personas.forEach(persona => {
        valores += `<tr>`
        valores += `<td>${persona.tipoId} ${persona.id}</td>`
        valores += `<td>${persona.nombre} ${persona.apellido}</td>`
        valores += `<td>${persona.correo}</td>`
        valores += `<td>${persona.peso}</td>`
        valores += `<td>${persona.estatura}</td>`
        valores += `<td>${persona.icm}</td>`
        valores += `<td>    <button type="button" onclick="cargarFormulario(${persona.id})" class="btn btn-warning btn-sm">Editar</button>`
        valores += `<button type="button" onclick="eliminarPersona(${persona.id})" class="btn btn-danger btn-sm">Eliminar</button> </td>`
        valores += `</tr>`
    })
    lista.innerHTML = valores
}















