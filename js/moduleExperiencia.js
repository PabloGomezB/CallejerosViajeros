var moduleExperiencia = (function () {

    // para llamar a esta funcion desde: el registro, updateLikes, updateDislikes....
    function extraerExperiencias(isAdmin, username){

        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/extraer.php",{
        })
        .then(function (respuesta){

            console.log(respuesta);
            let baseDades = JSON.parse(respuesta.data);
            
            // console.log(baseDades);
            printExperiencies(baseDades, isAdmin, username);
        
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    //////// Start Print Experiencies Jordi
    function printExperiencies(baseDades,isAdmin, username) {
        document.getElementById("content").innerHTML="";
        let htmlExperiences = `
            <h2 id="titolExperiencies">Experiencies</h2>
            <div class="content-row tarjeta">
                <div class="row">`; //class="grid"
        let index = 0;
        baseDades.forEach(element => {
            if (element.estat == 'publicada') {
                // console.info(element.imatge);
                htmlExperiences +=
                    `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 card-experiencia">
                        <div id="${element.idExp}" class="card">
                            <img src="./img/experiencias/${element.imatge}" class="card-img-top" alt="${element.imatge}">
                            <div class="card-body">
                                <h5 class="card-title">${element.titol}</h5>
                                <p class="card-data">${element.data}</p>
                            </div>
                        </div>
                    </div>`;
                index++;
            }
        });
        htmlExperiences +=
                `</div>
            <div>`;
        htmlExperiences += '<button id="newExp">Nova Experiencia</button>';
        // document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlExperiences);
        document.getElementById("content").innerHTML=htmlExperiences;
    
        // Apagar Lasts experiencies
        // document.getElementById("ultimesExperiencies").style.display = 'none';
        // Activar i desactivar cards

        document.querySelectorAll(".card").forEach(card => {
            card.addEventListener("click", function(e) {
                // Crear modal dinamicamente
                let idCard = card.getAttribute("id");
                let infoSelectedExp;

                baseDades.forEach(experiencia => {
                    if(experiencia.idExp == idCard){
                        infoSelectedExp = experiencia;
                    }
                    
                });

                let modal =
                `<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">${infoSelectedExp.titol}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h5>Popover in a modal</h5>
                            <p>This <a href="#" role="button" class="btn btn-secondary popover-test" title="Popover title" data-content="Popover body content is set in this attribute.">button</a> triggers a popover on click.</p>
                            <hr>
                            <h5>Tooltips in a modal</h5>
                            <p><a href="#" class="tooltip-test" title="Tooltip">This link</a> and <a href="#" class="tooltip-test" title="Tooltip">that link</a> have tooltips on hover.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>`

                document.getElementById("divModal").innerHTML = modal;
                $('#modal').modal()
            })
        });

/*
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
*/

        /////////////////////////////////////////////////////////////////
        //         AÑADE ADDLISTENERS A TODA LA CLASE LIKE         //
        /////////////////////////////////////////////////////////////////
        document.querySelectorAll(".like").forEach(experencia => {
            experencia.addEventListener("click", function(e) {
                    // console.info(e.target);
                    // console.info(e.target.id);
                    // console.info(e.target.getAttribute("posicion"));
                    
                    let posArray = e.target.getAttribute("posicion");
                    let idExp = baseDades[posArray]["idExp"];
                    let likes = parseInt(baseDades[posArray]["likes"])+1;
                    let dislikes = parseInt(baseDades[posArray]["dislikes"]);
        
                    updateLikes(idExp, likes, dislikes);       
            })
        });
        /////////////////////////////////////////////////////////////////
        //         AÑADE ADDLISTENERS A TODA LA CLASE DISLIKE         //
        /////////////////////////////////////////////////////////////////
        document.querySelectorAll(".dislike").forEach(experencia => {
            experencia.addEventListener("click", function(e) {
                // console.info(e.target);
                // console.info(e.target.id);
                // console.info(e.target.getAttribute("posicion"));
                
                let posArray = e.target.getAttribute("posicion");
                let idExp = baseDades[posArray]["idExp"];
                let likes = parseInt(baseDades[posArray]["likes"]);
                let dislikes = parseInt(baseDades[posArray]["dislikes"])+1;
    
                updateLikes(idExp, likes, dislikes);       
            })
        });
        /////////////////////////////////////////////////////////////////
        //         AÑADE ADDLISTENERS A TODA LA CLASE EDITAR         //
        /////////////////////////////////////////////////////////////////
        document.querySelectorAll(".editar").forEach(experencia => {
            experencia.addEventListener("click", function(e) {
                    // console.info(e.target);
                    // console.info(e.target.id);
                    let posArray = e.target.getAttribute("posicion");
                    // console.info(posArray);
            })
        });
        /////////////////////////////////////////////////////////////////
        //         AÑADE ADDLISTENERS A TODA LA CLASE ELIMINAR         //
        /////////////////////////////////////////////////////////////////
        document.querySelectorAll(".eliminar").forEach(experencia => {
            experencia.addEventListener("click", function(e) {
                    // console.info(e.target);
                    // console.info(e.target.id);
                    let posArray = e.target.getAttribute("posicion");
                    // console.info(posArray);
                    let idExp = baseDades[posArray]["idExp"];
                    
                    deleteExp(idExp);
            })
        });
        /////////////////////////////////////////////////////////////////
        //         AÑADE ADDLISTENERS A TODA LA CLASE REPORTAR         //
        /////////////////////////////////////////////////////////////////
        document.querySelectorAll(".reportar").forEach(experencia => {
            experencia.addEventListener("click", function(e) {
                    // console.info(e.target);
                    // console.info(e.target.id);
                    let posArray = e.target.getAttribute("posicion");
                    // console.info(posArray);
                    let idExp = baseDades[posArray]["idExp"];
                    
                    reportarExp(idExp);
            })
        });
        
    }
    //////// Finish Print Experiencies Jordi

    //////////////////// Start Nova Experiencia Jordi
    // Printar formulari
    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////
    //            AXIOS QUE MODIFICA LOS LIKES Y DISLIKES UNA EXPERIENCIA           //
    //////////////////////////////////////////////////////////////////////////////////
    function updateLikes (idUsu, likes, dislikes) {
        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/updateLikes.php",{
            params: {
                idUsu: idUsu,
                likes: likes,
                dislikes: dislikes
            }
        })
        .then(function (respuesta){
            // console.log(respuesta);
            if (respuesta.data.status=="FAIL") {
                alert("ERROR, TE HAS EQUIVODADO");
            } else {
                extraerExperiencias();
            }
        })
    }
    //////////////////////////////////////////////////////////////////////////////////
    //                   AXIOS QUE ELIMINA UNA EXPERIENCIA                          //
    //////////////////////////////////////////////////////////////////////////////////
    function deleteExp (idUsu) {
        //////////////////////////////////////////
    /// SUBIR FICHERO deleteExp.php al labs ///
        /////////////////////////////////////////
        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/deleteExp.php",{
            params: {
                idUsu: idUsu
            }
        })
        .then(function (respuesta){
            // console.log("RESPUESTA DELETEEXP: "+respuesta.data);
            if (respuesta.data.status=="FAIL") {
                alert("ERROR, TE HAS EQUIVODADO");
            } else {
                extraerExperiencias();
            }
        })
    }
    //////////////////////////////////////////////////////////////////////////////////
    //                   AXIOS QUE REPORTARA UNA EXPERIENCIA                        //
    //////////////////////////////////////////////////////////////////////////////////
    function reportarExp (idUsu) {
        //////////////////////////////////////////
    /// SUBIR FICHERO reportarExp.php al labs ///
        /////////////////////////////////////////
        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/reportarExp.php",{
            params: {
                idUsu: idUsu
            }
        })
        .then(function (respuesta){
            // console.log("RESPUESTA REPORTAREXP: "+respuesta.data);
            if (respuesta.data.status=="FAIL") {
                alert("ERROR, TE HAS EQUIVODADO");
            } else {
                extraerExperiencias();
            }
        })
    }

    function ananirExp (novaExp) {
        axios.get("./database/experiencias/ananirExp.php",{
            params: {
                titol: novaExp["titol"],
                data: novaExp["data"],
                text: novaExp["text"],
                imatge: novaExp["imatge"],
                coordenades: novaExp["coordenades"],
                categoria: novaExp["categoria"],
                likes: novaExp["likes"],
                dislikes: novaExp["dislikes"],
                estat: novaExp["estat"]
            }
        })
        .then(function (respuesta){
            // console.log("RESPUESTA REPORTAREXP: "+respuesta.data);
            if (respuesta.data.status=="FAIL") {
                alert("ERROR, TE HAS EQUIVODADO");
            } else {
                extraerExperiencias();
            }
        })

    } 

    return {
        extraerExperiencias: extraerExperiencias, 
        ananirExp : ananirExp
    };

})();