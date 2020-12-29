var moduleExperiencia = (function () {

    // para llamar a esta funcion desde: el registro, updateLikes, updateDislikes....
    function extraerExperiencias(isAdmin, username){

        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/extraer.php",{
        })
        .then(function (respuesta){

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
    function printExperiencies(baseDades, isAdmin, username) {
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

        /////////////////////////////////////////////////////////////////
        //   AÑADE LISTENERS A LAS CARDS Y CREA SU RESPECTIVO MODAL    //
        /////////////////////////////////////////////////////////////////
        document.querySelectorAll(".card").forEach(card => {
            card.addEventListener("click", function(e) {
                // Crear modal dinamicamente
                let idCard = card.getAttribute("id");
                let infoSelectedExp;
                let mapa;
                let existe = false;
                idExperienciaSeleccionada = idCard;

                baseDades.forEach(experiencia => {
                    if(experiencia.idExp == idCard){
                        existe = true;
                        infoSelectedExp = experiencia;
                        mapa = `<iframe src="http://maps.google.com/maps?q=${infoSelectedExp.coordenades}&t=k&z=7&output=embed&v=satellite" width="400px" height="400px" frameborder="0" style="border:0"></iframe>`
                        return;
                    }
                    
                });

                if (existe === true){

                    // Funcion para que aparezca el popover de google maps (todo boostrap)
                    // Mediante jQuery se consigue que aparezca el popover haciendo hover sobre el boton y se mantenga abierto en caso de explorar por el mapa
                    // El comportamiento del hover se añade tanto al boton como al mapa
                    // El set timeout es necesario para que el mapa se mantenga abierto al quitar el hover del boton
                    $(function () {
                        $('[data-toggle="popover"]').popover({
                            html: true,
                            trigger: "manual"
                        })
                        .on("mouseenter", function () {
                            let _this = this;
                            $(this).popover("show");
                            $(".popover").on("mouseleave", function () {
                                $(_this).popover('hide');
                            });
                        })
                        .on("mouseleave", function () {
                            let _this = this;
                            setTimeout(function () {
                                if (!$(".popover:hover").length) {
                                    $(_this).popover("hide");
                                }
                            }, 200);
                        });
                    })

                    let modal =
                    `<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div id="modal-content" class="modal-content">
                                <div class="modal-header" style="display:block">
                                    <h4 class="modal-title" id="exampleModalLongTitle">${infoSelectedExp.titol}</h4>
                                    <img src="./img/experiencias/${infoSelectedExp.imatge}" class="modal-img" alt="${infoSelectedExp.imatge}">
                                </div>
                                <div class="modal-body">
                                    <p>${infoSelectedExp.text}</p>                                   
                                </div>
                                <div id="modal-footer" class="modal-footer">

                                    <div class="box_likes-dislikes">
                                        <div class="">
                                            <span>${infoSelectedExp.likes}</span>
                                            <buttom posicion="${idCard}" id="like${idCard}" class="btn btn-primary like">Like</buttom>
                                        </div>
                                        <div class="">
                                            <buttom posicion="${idCard}" id="dislike${idCard}" class="btn btn-primary dislike">Dislike</buttom>
                                            <span class="number">${infoSelectedExp.dislikes}</span>
                                        </div>
                                    </div>`;
                    if (isAdmin || (username == infoSelectedExp.username)){
                            modal += `<button posicion="${idCard}" id="eliminar${idCard}" class="btn btn-primary a eliminar">Eliminar</button>
                                    <button posicion="${idCard}" id="editar${idCard}" class="btn btn-primary a editar">Editar</button>`;
                    }
                        modal += `  <button posicion="${idCard}" id="reportar${idCard}" class="btn btn-primary b reportar">Reportar</button>
                                    <div class="btn-popover">
                                        <a tabindex="0" class="btn" role="button" data-toggle="popover" title="Google Maps" data-container=".btn-popover" data-content='${mapa}'>Google Maps
                                            <i class="fas fa-map-marker-alt"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    aux_modal = modal;
                    document.getElementById("divModal").innerHTML = modal;
                    $('#modal').modal();

                    // Aqui llamas a las funciones que añaden los listeners a los botones (like, dislike...)
                    document.getElementById(`like${idCard}`).addEventListener("click", function(e){
                        let likes = parseInt(infoSelectedExp.likes)+1;
                        let dislikes = parseInt(infoSelectedExp.dislikes);
                        
                        updateLikes(idCard, likes, dislikes, isAdmin, username);

                        // todo esto para actualizar la info del modal
                        // Flujo: lo cierras, impides al usuario hacer clicks, y vuelvas a mostrar el model actualizado
                        $("*").css("pointer-events","none");
                        $("*").css("cursor","not-allowed");
                        document.getElementById("modal-footer").innerHTML=`<img src="./img/loading.gif" alt="Loading..." width="50px" style="margin-left:auto;margin-right:auto"></img>`;

                        setTimeout(function(){
                            $("*").css("pointer-events","auto");
                            $("*").css("cursor","default");
                            // con "toggle" lo escondemos
                            $('#modal').modal("toggle");
                            // con click() simulamos el click en la experiencia que se estaba visualizando
                            // Esto mosrtará la info actualizada ya que updateLikes() llama a la funcion extraerExperiencias() para obtener toda la info nueva
                            // y a su vez esta llama a printExperiencies() que se encarga de printarlas todas de nuevo y crear el listener con su respectivo modal
                            // entonces solo faltaria simular que el user ha clickado en la experiencia para que automaticamente aparezca con la nueva info
                            document.getElementById(idCard).click();
                        }, 2000);
                    });
                }
                else{
                    Swal.fire({
                        title: "¡VAYA!",
                        html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Código de error:<br>infoSelectedExp is: "+infoSelectedExp,
                        icon: "error",
                    });
                }
            })
        });

        // funcion para que aparezca otra vez el modal con la info actualziada despues de haber dado click en like/dislike
        // document.getElementById(idExperienciaSeleccionada).click();

        /////////////////////////////////////////////////////////////////
        //         AÑADE ADDLISTENERS A TODA LA CLASE LIKE             //
        /////////////////////////////////////////////////////////////////
        document.querySelectorAll(".like").forEach(experencia => {
            experencia.addEventListener("click", function(e) {
                    console.info(e.target);
                    console.info(e.target.id);
                    console.info(e.target.getAttribute("posicion"));
                    
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
    function updateLikes (idUsu, likes, dislikes, isAdmin, username) {
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
                extraerExperiencias(isAdmin, username);
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