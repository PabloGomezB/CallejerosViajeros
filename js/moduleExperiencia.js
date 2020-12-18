var moduleExperiencia = (function () {

    // para llamar a esta funcion desde: el registro, updateLikes, updateDislikes....
    function extraerExperiencias(){

        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/extraer.php",{
        })
        .then(function (respuesta){

            console.log(respuesta);
            let baseDades = JSON.parse(respuesta.data);
            
            // console.log(baseDades);
            printExperiencies(baseDades);
        
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    //////// Start Print Experiencies Jordi
    function printExperiencies(baseDades) {
        document.getElementById("content").innerHTML="";
        let htmlExperiences = '<h2 id="titolExperiencies">Experiencies</h2>';
        htmlExperiences += '<div class="grid">';
    
        console.info(baseDades);
        let index = 0;
        baseDades.forEach(element => {
            if (element.estat == 'publicada') {
                console.info(element.imatge);
                htmlExperiences += '<div class="card">';
                htmlExperiences += `<img src="./img/${element.imatge}" class="card-img-top" alt="...">`;
                htmlExperiences += '<div class="card-body">';
                htmlExperiences += `<h5 class="card-title">${element.titol}</h5>`;
                htmlExperiences += `<p class="card-text">${element.text}</p>`;
                htmlExperiences += `<p class="number">${element.likes}</p>`;
                htmlExperiences += `<a href="#" id="like${index}" class="btn btn-primary">Like</a>`;
            
                htmlExperiences += '<div class="divDis">';
                htmlExperiences += `<a href="#" id="dislike${index}" class="btn btn-primary">Dislike</a>`;
                htmlExperiences += `<p class="number">${element.dislikes}</p>`;
                htmlExperiences += '</div>';
            
                htmlExperiences += `<a href="#" id="editar${index}" class="btn btn-primary a">Editar</a>`;
                htmlExperiences += `<a href="#" id="eliminar${index}" class="btn btn-primary a">Eliminar</a>`;
                htmlExperiences += `<a href="#" id="reportar${index}" class="btn btn-primary b">Reportar</a>`;
                htmlExperiences += '</div>';
                htmlExperiences += '</div>';
                index++;
            }
        });
        htmlExperiences += '</div>';
        htmlExperiences += '<button id="newExp">Nova Experiencia</button>';
        // document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlExperiences);
        document.getElementById("content").innerHTML=htmlExperiences;
    
        // Apagar Lasts experiencies
        // document.getElementById("ultimesExperiencies").style.display = 'none';
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

        for (let index = 0; index < baseDades.length; index++) {
            document.getElementById(`like${index}`).addEventListener("click", function(e) {
                console.info(e.target.id);
                console.info(e.target.id.charAt(e.target.id.length-1));
                let posArray = parseInt(e.target.id.charAt(e.target.id.length-1));
                let idExp = baseDades[posArray]["idExp"];
                let likes = parseInt(baseDades[posArray]["likes"])+1;
                let dislikes = parseInt(baseDades[posArray]["dislikes"]);
    
                updateLikes(idExp, likes, dislikes);       
                
            })
    
            document.getElementById("dislike"+index).addEventListener("click", function(e) {
                 // console.info(e.target.id);
                console.info(e.target.id.charAt(e.target.id.length-1));
                let posArray = parseInt(e.target.id.charAt(e.target.id.length-1));
                let idExp = baseDades[posArray]["idExp"];
                let likes = parseInt(baseDades[posArray]["likes"]);
                let dislikes = parseInt(baseDades[posArray]["dislikes"])+1;

                updateLikes(idExp, likes, dislikes);
            })
    
            document.getElementById("editar"+index).addEventListener("click", function(e) {
                console.info(e.target.id);
            })
    
            document.getElementById("eliminar"+index).addEventListener("click", function(e) {
                console.info(e.target.id);
            })
    
            document.getElementById("reportar"+index).addEventListener("click", function(e) {
                console.info(e.target.id);
            })
        }
    }
    //////// Finish Print Experiencies Jordi

    function updateLikes (idUsu, likes, dislikes) {
        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/updateLikes.php",{
            params: {
                idUsu: idUsu,
                likes: likes,
                dislikes: dislikes
            }
        })
        .then(function (respuesta){
            console.log(respuesta);
            if (respuesta.data.status=="FAIL") {
                alert("ERROR, TE HAS EQUIVODADO");
            } else {
                extraerExperiencias();
            }
        })
    }

    return {
        extraerExperiencias: extraerExperiencias
    };

})();