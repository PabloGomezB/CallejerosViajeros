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
                                    <h4 class="modal-title" id="titulo${idCard}">${infoSelectedExp.titol}</h4>
                                    <img id="img${idCard}" src="./img/experiencias/${infoSelectedExp.imatge}" class="modal-img" alt="${infoSelectedExp.imatge}">
                                    <p id="fecha${idCard}" style="float:right;color:grey;margin-bottom:-20px;margin-right:45px;">${infoSelectedExp.data}</p>
                                </div>
                                <div id="modal-body" class="modal-body">
                                    <p id="texto${idCard}">${infoSelectedExp.text}</p>                                   
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


                    /////////////////////////////////////////////////////////////////
                    //             LISTENERS (like/dislike/editar...)              //
                    /////////////////////////////////////////////////////////////////

                    // LIKE
                    document.getElementById(`like${idCard}`).addEventListener("click", function(e){
                        let likes = parseInt(infoSelectedExp.likes)+1;
                        let dislikes = parseInt(infoSelectedExp.dislikes);
                        
                        updateLikes(idCard, likes, dislikes, isAdmin, username);
                        updateModalView(idCard);
                    });

                    // DISLIKE
                    document.getElementById(`dislike${idCard}`).addEventListener("click", function(e){
                        let likes = parseInt(infoSelectedExp.likes);
                        let dislikes = parseInt(infoSelectedExp.dislikes)+1;
                        
                        updateLikes(idCard, likes, dislikes, isAdmin, username);
                        updateModalView(idCard);
                    });

                    // EDITAR
                    // Marca como editables el titulo, la fecha y el texto
                    // Habilita la posibilidad de escribir en negrita e italica
                    // Guarda todos los cambios y muestra la experiencia actualizada
                    document.getElementById(`editar${idCard}`).addEventListener("click", function(e){
                        document.getElementById(`editar${idCard}`).disabled = true;
                        
                        document.getElementById(`titulo${idCard}`).contentEditable = true;
                        document.getElementById(`fecha${idCard}`).contentEditable = true;
                        
                        let textoExperiencia = document.getElementById(`texto${idCard}`);
                        textoExperiencia.contentEditable = true;
                        textoExperiencia.focus();
                        
                        let btnsModificarTexto = `<div style="display:flex;margin-left:auto;margin-right:auto;margin-top:5px;">
                            <button id="bold" class="btn formatTextBtn" style="margin-right:100px;"><i class="fas fa-bold"></i></button>
                            <button id="italic" class="btn formatTextBtn"><i class="fas fa-italic"></i></button>
                            <button id="save" class="btn saveTextBtn"><i class="fas fa-save"></i></button>
                        </div>`

                        document.getElementById("modal-body").insertAdjacentHTML("beforebegin", btnsModificarTexto);

                        document.getElementById("bold").addEventListener("click", function(e){
                            document.getElementById("bold").classList.toggle("formatTextBtn-focus");
                            document.execCommand('bold');
                            textoExperiencia.focus();
                        });
                        document.getElementById("italic").addEventListener("click", function(e){
                            document.getElementById("italic").classList.toggle("formatTextBtn-focus");
                            document.execCommand('italic');
                            textoExperiencia.focus();
                        });
                        document.getElementById("save").addEventListener("click", function(e){
                            let newTitulo = document.getElementById(`titulo${idCard}`).textContent;
                            let newFecha = document.getElementById(`fecha${idCard}`).textContent;
                            let newTexto = document.getElementById(`texto${idCard}`).innerHTML;
                            let newSrc = document.getElementById(`img${idCard}`).src;
                            // Obtener solo el nombre de la imagen, no todo el src (el nombre se encuentra despues del ultimo "/")
                            let n = newSrc.lastIndexOf('/');
                            let newImg = newSrc.substring(n + 1);

                            updateExperiencia(idCard,newTitulo,newFecha,newTexto,newImg,isAdmin, username);
                            updateModalView(idCard);
                        });

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
    //                   AXIOS QUE ACTUALIZA UNA EXPERIENCIA                        //
    //////////////////////////////////////////////////////////////////////////////////
    function updateExperiencia (idCard,newTitulo,newFecha,newTexto,newImg, isAdmin,username) {

        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/updateExperiencia.php",{
            params: {
                idCard: idCard,
                newTitulo: newTitulo,
                newFecha: newFecha,
                newTexto: newTexto,
                newImg: newImg
            }
        })
        .then(function (respuesta){
            console.log("RESPUESTA UPDATE: "+respuesta.data);
            if (respuesta.data=="FAILj") { // DA FAIL Y NO SE PORQUEEE QUE ESTA PASANDOOOOOOOOOO DA FAIL PERO LO GUARDA QUE LOCURA ES ESTAAAAAAAAAA. un pablo desesperado :)
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

    // Esta funcion se llama justo despues de que un usuario modifique algo de las experiencias (modal)
    // Funcionamiento: impides al usuario hacer clicks para que cierre el modal, insertas el gif de loading, setTimeout para asegurarnos de que se haya modificado
    // la info en la DB y el axios haya obtenido la info actualizada, reseteas los clicks, cierras el modal viejo y simulas click sobre
    // la experiencia previamente abierta para volverla a abrir automaticamente.
    function updateModalView(idCard){
        $("*").css("pointer-events","none");
        $("*").css("cursor","not-allowed");
        document.getElementById("modal-footer").innerHTML=`<img src="./img/loading.gif" alt="Loading..." width="50px" style="margin-left:auto;margin-right:auto"></img>`;

        setTimeout(function(){
            $("*").css("pointer-events","auto");
            $("*").css("cursor","default");
            // con "toggle" cerramos el modal y con click() lo volvemos a abrir
            $('#modal').modal("toggle");
            document.getElementById(idCard).click();
        }, 2000);
    }

    return {
        extraerExperiencias: extraerExperiencias, 
        ananirExp : ananirExp
    };

})();