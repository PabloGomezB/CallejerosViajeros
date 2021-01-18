window.onload = function () {

    var logeado = false;
    var username = "";
    var isAdmin = false;


    axios.get('./database/usuari/isLogged.php')
    .then(function (respuesta) {
        setSidebar();
        if(respuesta.data != ""){
            logeado = true;
            username = respuesta.data.username;
            isAdmin = respuesta.data.isAdmin;
            console.log(respuesta.data)
            transformarSidebar();
            moduleExperiencia.extraerExperiencias(isAdmin, username);
        }
        else{
            logeado = false;
            setFormsFeatures();
            muestraTituloExperiencias();
            setListenerLogin();
            setListenerRegistro();
        }
    })
    .catch(function (error) {
        Swal.fire({
            title: "¡VAYA!",
            html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)",
            icon: "error",
        });
        console.log(error);
    })
    .then(function () {
        //
    });



    function setSidebar(){
        // Funcion para gestionar el comportamiento y la vista del sidebar
        $('.borderAssets').css("display","block");

        $('.borderAssets').removeClass('fade-out');
        $('.borderAssets').addClass('fade-in');

        $("#dropDownLogin").click();
        $('#sidebarCollapse').on('click', function () {
            
            if ($('#sidebar').hasClass("active")) {
                if(logeado == false){
                    document.getElementById("email").focus();
                }
                // add fade-out para el texto de border antes del login
                $('.borderAssets').removeClass('fade-in');
                $('.borderAssets').addClass('fade-out');

                // "animacion" para quitar el border cada vez que se esconde el sidebar
                setTimeout(function () {$('#sidebar').css("border-right", "90px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "80px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "70px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "60px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "50px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "40px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "30px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "20px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "10px solid #04aef0");}, 100);
                setTimeout(function () {$('#sidebar').css("border-right", "0px solid #04aef0");}, 100);

                // setTimeout para ocultar el texto para que el cursor no lo detecte y se pueda hacer click en los inputs
                // 400 de tiempo porque tarda 0.3s en hacer el efecto de fade-out, sino se iría de golpe antes de que termine la animacion
                setTimeout(function () {
                    $('.borderText').css("display", "none");
                }, 400);
            } else {
                // add fade-in para el texto de border antes del login
                $('.borderAssets').removeClass('fade-out');
                $('.borderAssets').addClass('fade-in');
                setTimeout(function () {
                    $('.borderText').css("display", "initial");
                }, 100);

                // se restablece el border del sidebar cuando se esconde
                $('#sidebar').css("border-right", "100px solid #04aef0");
            }
            $('#sidebar').toggleClass('active');
        });
    }

    function setFormsFeatures(){
        // Esta funcion resetea los campos de los formularios además de esconderlos en caso de hacer click en uno u otro
        document.querySelectorAll(".dropdown-toggle").forEach(dropDownItem => {
            dropDownItem.addEventListener("click", function () {
                $("#dropDownRegistro").click();
                $("#dropDownLogin").click();

                if ($("#dropDownLogin").attr('aria-expanded') == 'true') {
                    reset("#formRegistro");
                    document.getElementById("email").focus();
                } else {
                    reset("#formLogin");
                    document.getElementById("nom").focus();
                }
            })

            function reset(id) {
                let form = document.querySelector(id);
                form.querySelectorAll("input.form-control").forEach(input => {
                    input.value = ``;
                })
                form.querySelector(".checkboxPass").checked = false;
            }
        });

        // Aqui se añade la funcionalidad de enviar los formularios presionando ENTER en cada uno de los campos existentes
        let formLogin = document.querySelector("#formLogin");
        submitOnEnter(formLogin, "login");

        let formRegistro = document.querySelector("#formRegistro");
        submitOnEnter(formRegistro, "register");

        function submitOnEnter(form, btnId) {
            form.querySelectorAll("input.form-control").forEach(input => {
                input.addEventListener("keyup", function (event) {
                    if (event.key === "Enter") {
                        document.getElementById(btnId).click();
                    }
                })
            })
        }

        // Muestra las contraseñas de los formularios y marca los checkbox
        document.querySelectorAll(".checkEyePass").forEach(spanCheckBox => {
            spanCheckBox.addEventListener("click", function () {
                document.querySelectorAll(".passwd").forEach(inputPass => {
                    if (inputPass.type === "password") {
                        document.querySelectorAll(".checkboxPass").forEach(checkbox => {
                            checkbox.checked = true
                        });
                        inputPass.type = "text";
                    } else {
                        document.querySelectorAll(".checkboxPass").forEach(checkbox => {
                            checkbox.checked = false
                        });
                        inputPass.type = "password";
                    }
                })
            })
        })
    }

    
    // ANTES DE HACER LOGIN
    // AXIOS para mostrar los titulos de las ultimas experiencias
    function muestraTituloExperiencias(){
        axios.get("./database/experiencias/extraerExperiencias.php", {
            params: {
                categoria: "Todas"
            }
            }).then(function (respuesta) {
                let baseDades = JSON.parse(respuesta.data);
                
                let htmlLastExperiences = `<div id="ultimesExperiencies" class="titolExperiencia"><h2>Ultimes Experiencies</h2>`;

                // esto ya no es necesario porque se obtienen 4 experiencias
                let maxBaseDades = parseInt(baseDades.length);
                if (maxBaseDades < 5) {
                    maxBaseDades = maxBaseDades - 5;
                }
                
                let top = 0;
                for (let i = parseInt(baseDades.length) - 1; top < 4; i--) {

                    let element = baseDades[i]["titol"];
                    htmlLastExperiences += `<div id="experiencia${i}" class="pExperiences">`;
                    htmlLastExperiences += `<p>${element}</p>`;
                    htmlLastExperiences += '</div>';
                    top++;
                }

                htmlLastExperiences += '</div>';
                // injectar despres del primer div
                document.getElementById('enunciat').innerHTML="Experiencias";
                document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlLastExperiences);

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
        });
    }

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // LOGIN
    function setListenerLogin(){
        document.getElementById("login").addEventListener("click", function () {
            if (document.getElementById("email").value === "" || document.getElementById("passLogin").value === "") {
                Swal.fire({
                    title: "¡ERROR!",
                    text: "Has dejado campos vacíos...",
                    icon: "error",
                });
            } else {
                axios.get('./database/usuari/login.php', {
                        params: {
                            email: document.getElementById("email").value,
                            pass: document.getElementById("passLogin").value
                        }
                    })
                    .then(function (respuesta) {
                        if (respuesta.data.status == "FAIL") {
                            Swal.fire({
                                title: "¿Tienes cuenta?",
                                text: "El usuario y/o contraseña no coinciden",
                                icon: "error",
                            });
                        } else {
                            // puede ser null si axios funciona bien pero algo falla en login.php
                            if (respuesta.data.email == null) {
                                Swal.fire({
                                    title: "¡VAYA!",
                                    html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)",
                                    icon: "error",
                                });
                            } else {
                                // console.log(respuesta.data);
                                logeado = true;
                                username = respuesta.data.email;
                                if (respuesta.data.isAdmin == 1) {
                                    isAdmin = true;
                                }
                                $('#sidebar').toggleClass('active');
                                transformarSidebar();
                                moduleExperiencia.extraerExperiencias(isAdmin, username);

                            }
                        }
                    })
                    .catch(function (error) {
                        Swal.fire({
                            title: "¡VAYA!",
                            html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>" + error,
                            icon: "error",
                        });
                        console.log(error);
                    })
                    .then(function () {
                        //
                    });
            }
        })
    }

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // REGISTER
    function setListenerRegistro(){
        document.getElementById("register").addEventListener("click", function () {
            if (document.getElementById("nom").value === "" || document.getElementById("cognom").value === "" ||
                document.getElementById("username").value === "" || document.getElementById("passRegister").value === "") {
                Swal.fire({
                    title: "¡ERROR!",
                    text: "Has dejado campos vacíos...",
                    icon: "error",
                });
            } else {
                axios.get('./database/usuari/register.php', {
                        params: {
                            nom: document.getElementById("nom").value,
                            cognom: document.getElementById("cognom").value,
                            username: document.getElementById("username").value,
                            pass: document.getElementById("passRegister").value
                        }
                    })
                    .then(function (respuesta2) {
                        if (respuesta2.data.status == "FAIL") {
                            Swal.fire({
                                title: "Ups..",
                                html: `Ya existe un usuario con este mismo correo
                                    <br>[${respuesta2.data.email}]<br>
                                    Inténtelo de nuevo con otro distinto`,
                                icon: "error",
                            });
                        } else {
                            // PRINT VISTA DE LOGEADO
                            logeado = true;
                            username = respuesta2.data.email;
                            $('#sidebar').toggleClass('active');
                            transformarSidebar();
                            moduleExperiencia.extraerExperiencias(isAdmin, username);
                        }
                    })
                    .catch(function (error) {
                        Swal.fire({
                            title: "¡VAYA!",
                            html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>" + error,
                            icon: "error",
                        });
                        console.log(error);
                    })
                    .then(function () {
                        //
                    });
            }

        })
    }

    // Funcion para cambiar el contenido del sidebar una vez el usuario se hay logeado
    function transformarSidebar() {

        // Esconder el sidebar y añadir el border
        // $('#sidebar').toggleClass('active');
        $('#sidebar').css("border-right", "100px solid #04aef0");

        // Obtenemos el div que contiene los formularios para sobreescribirlo
        let sidebar = document.getElementById("formsIndex");
        sidebar.innerHTML = `<button id="logout" style="margin-top:50px;">LOGOUT</button>`;

        $('.borderAssets').removeClass('fade-out');
        $('.borderAssets').addClass('fade-in');

        $('.borderText').css("top", "200px");
        $('.borderText').css("height", "fit-content");
        $('.borderText').css("display", "initial");

        // Cambia el boton para abrir sidebar
        document.getElementById("sidebarCollapse").innerHTML = `Opciones`;
        // Cambia el texto del borde del sidebar
        document.getElementById("borderText").innerHTML = `Opciones`;

        if (isAdmin) {
            let sidebarAdmin =
                `<button>Rol admin: ${username}</button>`;
            sidebar.insertAdjacentHTML("beforeend", sidebarAdmin);

            let categoriaAdmin =
                `<button id="categoriaAdmin">Categorias</button>` + `<br>`;
            sidebar.insertAdjacentHTML("beforeend", categoriaAdmin);
            document.getElementById("categoriaAdmin").addEventListener('click', function(){
                axios.get("./database/categoria/categoria.php",{
                })
                .then(function (respuesta){
                    let categorias = JSON.parse(respuesta.data);
                    let htmlmodal = `<div id="modalCategoria" class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Categorias</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <input type="text" id="nuevaCategoria"></input><button id="crearCategory" data-dismiss="modal">Crear</button><br>`;

                        categorias.forEach(categoria => {
                            htmlmodal += `<label>${categoria.nom}</label><br>`;
                        })
                        htmlmodal += `
                        </div>
                        </div>
                    </div>
                    </div>`;
                    document.getElementById("modalAdminCat").innerHTML = htmlmodal;
                    $("#modalCategoria").modal();
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    document.getElementById("crearCategory").addEventListener('click', function (){
                        nuevaCategoria = document.getElementById("nuevaCategoria").value;
                        console.log(nuevaCategoria);
                        axios.get("./database/categoria/crearCategoria.php",{
                            params: {
                                nom: nuevaCategoria
                            }
                        })
                    });
                })
            })

            let experienciasAdmin =
                `<button id="expAdmin">Experiencias</button>` + `<br>`;
            sidebar.insertAdjacentHTML("beforeend", experienciasAdmin);
            document.getElementById("expAdmin").addEventListener('click', function(){
                 axios.get("./database/experiencias/mostrarExperiencias.php",{
                 })
                 .then(function(respuesta){
                     console.log(respuesta.data);
                     let experiencias = JSON.parse(respuesta.data);
                     let htmlmodal = `<table>`;
                             for(i=0;i<experiencias.length;i++){
                                 htmlmodal += `<tr>
                                 <td id="${experiencias[i].idExp}">${experiencias[i].titol}</td>
                                 <td><button class="btnRebutjarExp" nombre="${experiencias[i].idExp}">Rechazar</td>
                                 <td><button class="btnPublicarExp" nombre="${experiencias[i].idExp}">Publicar</td>
                                 </tr>`;
                             }
                             htmlmodal += `</table>`;
                        document.getElementById("esbozos").innerHTML = htmlmodal;
                        
                        axios.get("./database/experiencias/mostrarReportadas.php",{
                        })
                            .then(function(respuesta){
                                console.log(respuesta.data);
                                let expreportadas = JSON.parse(respuesta.data);
                                let reportadashtml = `<table>`;
                                for(i=0;i<expreportadas.length;i++){
                                    console.log(expreportadas[i].titol);
                                    reportadashtml += `<tr>
                                    <td id="${expreportadas[i].idExp}">${expreportadas[i].titol}</td>
                                    <td><button class="btnQuitarReporte" nombre="${expreportadas[i].idExp}">Quitar Reporte</td>
                                    <td><button class="btnRebutjarExp" nombre="${expreportadas[i].idExp}">Eliminar Experiencia</td>
                                    </tr>`;
                                }
                                reportadashtml += `</table>`;
                                console.log(reportadashtml);
                                document.getElementById("reportadas").innerHTML = reportadashtml;
                            })
                            .catch(function(error){
                                console.log(error);
                            })
                        $("#modalExp").modal();
                 })
                 .catch(function (error){
                     console.log(error);
                 })
                 .then(function (){
                    botonesEliminar = document.getElementsByClassName("btnRebutjarExp");
                    for(i=0;i<botonesEliminar.length;i++){
                        botonesEliminar[i].addEventListener('click', function(e){
                            let seleccionado = e.target.getAttribute("nombre");
                            axios.get("./database/experiencias/eliminarExperiencia.php",{
                                params: {
                                        idCard: seleccionado
                                }
                            })
                            .then(function(){
                                e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                            })
                        })
                    }
                    botonesPublicar = document.getElementsByClassName("btnPublicarExp");
                    for(i=0;i<botonesPublicar.length;i++){
                        botonesPublicar[i].addEventListener('click', function(e){
                            let seleccionado = e.target.getAttribute("nombre");
                            console.log(seleccionado)
                            axios.get("./database/experiencias/updateEstado.php",{
                                params: {
                                        idExp: seleccionado
                                }
                            })
                            .then(function(){
                                e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                            })
                            .catch(function(error){
                                console.log(error);
                            })
                        })
                    }
                    botonesReporte = document.getElementsByClassName("btnQuitarReporte");
                    for(i=0;i<botonesReporte.length;i++){
                        botonesReporte[i].addEventListener('click', function (e) {
                            let seleccionado = e.target.getAttribute("nombre");
                            console.log(seleccionado);
                            axios.get("./database/experiencias/updateReporte.php",{
                                params: {
                                    idCard: seleccionado
                                }
                            })
                            .then(function(){
                                e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                            })
                        })
                    }
                });
            })
            let usuarisAdmin =
            `<button id="usersAdmin">Usuarios</button>`;
            sidebar.insertAdjacentHTML("beforeend", usuarisAdmin);
            document.getElementById("usersAdmin").addEventListener('click', function(){
                axios.get("./database/usuari/mostrarUsuarios.php",{
                })
                .then(function (respuesta){
                    let usuarios = respuesta.data;
                    let htmlmodal = `<div id="modalUser" class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Usuarios</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table>`;
                        for(i=0; i<usuarios.length; i++){
                            htmlmodal += `<tr>
                            <td id="${usuarios[i].username}">${usuarios[i].username}</td>
                            <td><button class="btnEliminarUser" nombre="${usuarios[i].username}">Darse de baja</button></td>
                            </tr>`;
                        }
                        htmlmodal += `</table>
                        </div>
                        </div>
                    </div>
                    </div>`;
                    document.getElementById("modalAdminUser").innerHTML = htmlmodal;
                    $("#modalUser").modal();
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    botonesEliminar = document.getElementsByClassName("btnEliminarUser");
                    for(i=0;i<botonesEliminar.length;i++){
                        botonesEliminar[i].addEventListener('click', function(e){
                            let seleccionado = e.target.getAttribute("nombre");
                            axios.get("./database/usuari/eliminarUsuario.php",{
                                params: {
                                        username: seleccionado
                                }
                            })
                            .then(function(){
                                e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                            })
                        })
                    }
                });
            })
            document.getElementById("formsIndex").insertAdjacentHTML("beforeend",`<button id="newExp">Nova Experiencia</button>`);
        }
        else{
            let sidebarNormalUser =
                `<button>Rol user: ${username}</button>`;
            sidebar.insertAdjacentHTML("beforeend", sidebarNormalUser);
            document.getElementById("formsIndex").insertAdjacentHTML("beforeend",`<button id="newExp">Nova Experiencia</button>`);
        }
        
        //LOGOUT
        document.getElementById("logout").addEventListener('click',function(e){
            axios.get('./database/usuari/logout.php')
            .then(function (respuesta) {
                console.log(respuesta.data);
                if(respuesta.data == "OK"){
                    window.location.reload();
                }
            })
            .catch(function (error) {
                Swal.fire({
                    title: "¡VAYA!",
                    html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)",
                    icon: "error",
                });
                console.log(error);
            })
            .then(function () {
                //
            });
        })

        // Nova Experiencia
        document.getElementById("newExp").addEventListener('click', function (e) {
            document.getElementById("newExp").disabled = true;
            moduleNewExperiencia.crearExperiencia(username, isAdmin);
        });

    }
}

