window.onload = function () {

    axios.get("../ViajesKolvin/database/experiencias/extraer.php",{
    })
    .then(function (respuesta){
        console.log(respuesta);
        
        let baseDades = JSON.parse(respuesta.data);
        
        // console.log(baseDades);
        printLastExperiences(baseDades);
    
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}


function printLastExperiences(baseDades) {
    // Seleccionem les 5 ultimes entrades
    // Mejorara Optitiva!!! Si las experiencias son menores a 5 no muestran esas 5 ultimas.
    // let lastFive = baseDades.slice(Math.max(baseDades.length - 5, 1));
    // console.info(lastFive);
    // Guardem l'informacio que ens interessa en un nova array 
    // let newArray = [];
    // lastFive.forEach(element => newArray.push(element.titol));
    // Creeem l'html
    let htmlLastExperiences = `<div id="ultimesExperiencies" class="titolExperiencia"><h2>Ultimes Experiencies</h2>`;
    for (let i = 0; i < baseDades.length; i++) {
        let element = baseDades[i]["titol"];
        // console.info(element);
        htmlLastExperiences += `<div id="experiencia${i}" class="pExperiences">`;
        htmlLastExperiences += `<p>${element}</p>`;
        htmlLastExperiences += '</div>';
    }
    htmlLastExperiences += '</div>';
    // injectar despres del primer div
    document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlLastExperiences);
}