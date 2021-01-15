window.onload = function () {

    var logeado = false;
    var username = "";
    var isAdmin = false;

    // Funcion para gestionar el comportamiento y la vista del sidebar
    $("#dropDownLogin").click();
    $('#sidebarCollapse').on('click', function () {
        
        if ($('#sidebar').hasClass("active")) {
            if(username == null || username == ""){
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

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // ANTES DE HACER LOGIN
    // AXIOS para mostrar los titulos de las ultimas experiencias
    axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/extraer.php", {})
        .then(function (respuesta) {
            let baseDades = JSON.parse(respuesta.data);
            let htmlLastExperiences = `<div id="ultimesExperiencies" class="titolExperiencia"><h2>Ultimes Experiencies</h2>`;

            let maxBaseDades = parseInt(baseDades.length);
            if (maxBaseDades < 5) {
                maxBaseDades = maxBaseDades - 5;
            }

            let top = 0;
            for (let i = parseInt(baseDades.length) - 1; top < 5; i--) {
                let element = baseDades[i]["titol"];
                htmlLastExperiences += `<div id="experiencia${i}" class="pExperiences">`;
                htmlLastExperiences += `<p>${element}</p>`;
                htmlLastExperiences += '</div>';
                top++;
            }

            htmlLastExperiences += '</div>';
            // injectar despres del primer div
            document.getElementById('enunciat').insertAdjacentHTML('afterEnd', htmlLastExperiences);

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // LOGIN
    document.getElementById("login").addEventListener("click", function () {
        if (document.getElementById("email").value === "" || document.getElementById("passLogin").value === "") {
            Swal.fire({
                title: "¡ERROR!",
                text: "Has dejado campos vacíos...",
                icon: "error",
            });
        } else {
            axios.get('http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/usuari/login.php', {
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
                                html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>email undefined",
                                icon: "error",
                            });
                        } else {
                            console.log(respuesta.data);
                            logeado = true;
                            username = respuesta.data.email;
                            if (respuesta.data.isAdmin == 1) {
                                isAdmin = true;
                            }
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

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // REGISTER
    document.getElementById("register").addEventListener("click", function () {
        if (document.getElementById("nom").value === "" || document.getElementById("cognom").value === "" ||
            document.getElementById("username").value === "" || document.getElementById("passRegister").value === "") {
            Swal.fire({
                title: "¡ERROR!",
                text: "Has dejado campos vacíos...",
                icon: "error",
            });
        } else {
            axios.get('http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/usuari/register.php', {
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

    // Funcion para cambiar el contenido del sidebar una vez el usuario se hay logeado
    function transformarSidebar() {

        // Esconder el sidebar y añadir el border
        $('#sidebar').toggleClass('active');
        $('#sidebar').css("border-right", "100px solid #04aef0");

        // Obtenemos el div que contiene los formularios para sobreescribirlo
        let sidebar = document.getElementById("formsIndex");
        sidebar.innerHTML = `<button onClick="window.location.reload();">LOGOUT</button>`;

        $('.borderAssets').removeClass('fade-out');
        $('.borderAssets').addClass('fade-in');

        $('.borderText').css("top", "140px");
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
            document.getElementById("categoriaAdmin").addEventListener('click', function () {
                axios.get("./database/categoria/categoria.php", {})
                    .then(function (respuesta) {
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
                            <input type="text"></input><button id="crearCategory">Crear</button><br>`;

                        categorias.forEach(categoria => {
                            console.log(categoria.nom);

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
                    .then(function () {});
            })

            let experienciasAdmin =
                `<button onClick="">Experiencias</button>` + `<br>`;
            sidebar.insertAdjacentHTML("beforeend", experienciasAdmin);

            let usuarisAdmin =
            `<button id="usersAdmin">Usuarios</button>`;
            sidebar.insertAdjacentHTML("beforeend", usuarisAdmin);
            document.getElementById("usersAdmin").addEventListener('click', function(){
                axios.get("http://labs.iam.cat/~a16miqboipos/CallejerosViajeros/database/usuari/mostrarUsuarios.php",{
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
            
        }
        else{
            let sidebarNormalUser =
                `<button>Rol user: ${username}</button>`;
            sidebar.insertAdjacentHTML("beforeend", sidebarNormalUser);
        }
    }
}

