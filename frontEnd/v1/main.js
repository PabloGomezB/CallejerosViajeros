// // printejar ultims viatges
// let experiencies = {"1": "Viatge Albània, Kosovo i Macedònia en grup. Nadal", "2": "Viatge Tanzània Safari Nord i Natron. Nadal",
// "3": "Viatge Costa Rica en grup. Nadal", "4": "Viatge Líban Clàssic 10 Dies. Nadal",
// "5": "Viatge Emirats Àrabs en grup. Nadal", "6": "Líban Trekking 8 Dies. Nadal",
// "7": "Viatge Grècia en grup. Nadal", "8": "Viatge Sèrbia en grup. Ciutats i parcs de l'antiga Iugoslàvia. Nadal",
// "9": "Viatge Sudan en grup. Nadal", "10": "Viatge al Rabal en grup. Nadal"};

// function printLastExperiences() {
//     let htmlExperiences = `<div class="titleExperiences"><h3>Ultimes Experiencies</h3></div>`;
//     let i = 0;
//     for (var key in experiencies) {
//         if (experiencies.hasOwnProperty(key)) {
//             i++;
//             htmlExperiences += `<div id="experiences${i}" class="pExperiences">`;
//             htmlExperiences += `<p>${experiencies[key]}</p>`;
//             htmlExperiences += '</div>';

//         }
//     }
//     htmlExperiences += '</div>';

//     // injectar despres del primer div
//     document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlExperiences);
// }

// printLastExperiences();

// Funcions

let baseDades = Viatges.experienciesDB();

function printLastExperiences() {
    // Seleccionem les 5 ultimes entrades
    let lastFive = baseDades.slice(Math.max(baseDades.length - 5, 1));
    // Guardem l'informacio que ens interessa en un nova array 
    let newArray = [];
    lastFive.forEach(element => newArray.push(element.titol));
    // Creeem l'html
    let htmlLastExperiences = `<div id="ultimesExperiencies" class="titolExperiencia"><h2>Ultimes Experiencies</h2>`;
    let i = 0;
    
    for (let i = 0; i < newArray.length; i++) {
        const element = newArray[i];

        htmlLastExperiences += `<div id="experiencia${i}" class="pExperiences">`;
        htmlLastExperiences += `<p>${element}</p>`;
        htmlLastExperiences += '</div>';
    }
    htmlLastExperiences += '</div>';
    // injectar despres del primer div
    document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlLastExperiences);
}

printLastExperiences();

function printExperiencies() {
    let htmlExperiences = '<h2>Experiencies</h2>';
    htmlExperiences += '<div class="grid">';

    baseDades.forEach(element => {
        if (element.estat == 'publicada') {
            htmlExperiences += '<div class="card">';
            htmlExperiences += `<img src="img/${element.imatge}" class="card-img-top" alt="...">`;
            htmlExperiences += '<div class="card-body">';
            htmlExperiences += `<h5 class="card-title">${element.titol}</h5>`;
            htmlExperiences += `<p class="card-text">${element.text}</p>`;
            htmlExperiences += `<p class="number">${element.likes}</p>`;
            htmlExperiences += '<a href="#" class="btn btn-primary">Like</a>';
        
            htmlExperiences += '<div class="divDis">';
            htmlExperiences += '<a href="#" class="btn btn-primary">Dislike</a>';
            htmlExperiences += `<p class="number">${element.dislikes}</p>`;
            htmlExperiences += '</div>';
        
            htmlExperiences += '<a href="#" class="btn btn-primary a">Editar</a>';
            htmlExperiences += '<a href="#" class="btn btn-primary a">Eliminar</a>';
            htmlExperiences += '<a href="#" class="btn btn-primary b">Reportar</a>';
            htmlExperiences += '</div>';
            htmlExperiences += '</div>';
        }
    });
    htmlExperiences += '</div>';

    document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlExperiences);
}

// Listeners
// Login
document.getElementById("login").addEventListener("click", function(){
    if (document.getElementById("formLogin").style.display == "none") {
        document.getElementById("formLogin").style.display = "block";
        document.getElementById("formSingUp").style.display = "none";
    } else {
        document.getElementById("formLogin").style.display = "none";
    }
})
// SingUp
document.getElementById("singup").addEventListener("click", function(){
    if (document.getElementById("formSingUp").style.display == "none") {
        document.getElementById("formLogin").style.display = "none";
        document.getElementById("formSingUp").style.display = "block";
    } else {
        document.getElementById("formSingUp").style.display = "none";

    }
})
// Connectar-se amb axios
document.getElementsByClassName('btn')[0].addEventListener('click', function() {

    axios.get('http://labs.iam.cat/~a18jorgornei/viatges/v1/valida.php', {
        params: {
            user: document.getElementById("usernameLogin").value,
            pass: document.getElementById("passwordLogin").value
        }
    })
    .then(function (response) {

        if (response.data.status=="fail"){
            alert("ERROR, Usuari o Contrasenya Incorrectes")
        }
        else{                            
            document.getElementById("panell").style.display="block";
            document.getElementById("benvinguda").innerHTML=`Benvinguda ${response.data.name}`;
            printExperiencies();
            // Apagar Lasts experiencies
            document.getElementById("ultimesExperiencies").style.display = 'none';
            // Activar i desactivar cards
            for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
                document.getElementsByClassName("card-img-top")[i].addEventListener("click", function(e){
                    for (let j = 0; j < document.getElementsByClassName("card-body").length; j++) {
                        if (j != i) {
                            document.getElementsByClassName("card-body")[j].style.display = "none";
                        }
                    }
                    if (document.getElementsByClassName("card-body")[i].style.display == "block") {
                        document.getElementsByClassName("card-body")[i].style.display = "none";
                    } else {
                        document.getElementsByClassName("card-body")[i].style.display = "block";
                    }
                })
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
});