window.onload = function () {

    var logeado = false;
    var username = "";
    var isAdmin = false;

    // Esta funcion gestiona el comportamiento del sidebar
    $(document).ready(function () {
        // $('#sidebar').toggleClass('active');
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
        $("#dropDownLogin").click();
        // $('#desplegableLogin').removeClass('collapse');
    });

    // Estas dos funciones resetean los campos de los formularios además de esconderlos en caso de hacer click en uno u otro
    document.getElementById("dropDownLogin").addEventListener("click", function(){
        $("#dropDownRegistro").click();
        let formRegistro = document.querySelector("#formRegistro");
        formRegistro.querySelectorAll("input.form-control").forEach(input => {
            input.value = ``;
        })
        formRegistro.querySelector(".checkboxPass").checked = false;
    })
    document.getElementById("dropDownRegistro").addEventListener("click", function(){
        $("#dropDownLogin").click();
        let formLogin = document.querySelector("#formLogin");
        formLogin.querySelectorAll("input.form-control").forEach(input => {
            input.value = ``;
        })
        formLogin.querySelector(".checkboxPass").checked = false;
    })

    // Aqui se añade la funcionalidad de enviar los formularios presionando ENTER en cada uno de los campos existentes
    let formLogin = document.querySelector("#formLogin");
    formLogin.querySelectorAll("input.form-control").forEach(input => {
        input.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                // event.preventDefault();
                document.getElementById("login").click();
            }
        })
    })
    let formRegistro = document.querySelector("#formRegistro");
    formRegistro.querySelectorAll("input.form-control").forEach(input => {
        input.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                // event.preventDefault();
                document.getElementById("register").click();
            }
        })
    })


    // Muestra las contraseñas de los formularios y marca los checkbox
    document.querySelectorAll(".checkEyePass").forEach(spanCheckBox => {
        spanCheckBox.addEventListener("click", function () {
            document.querySelectorAll(".passwd").forEach(inputPass => {
                if (inputPass.type === "password") {
                    document.querySelectorAll(".checkboxPass").forEach(checkbox => {checkbox.checked = true});
                    inputPass.type = "text";
                } else {
                    document.querySelectorAll(".checkboxPass").forEach(checkbox => {checkbox.checked = false});
                    inputPass.type = "password";
                }
            })
        })
    })

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // ANTES DE HACER LOGIN
    // AXIOS para mostrar los titulos de las ultimas experiencias
    axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/experiencias/extraer.php",{
    })
    .then(function (respuesta){
        // console.log(respuesta);
        let baseDades = JSON.parse(respuesta.data);
        // console.log(baseDades);
        // printLastExperiences(baseDades);
        let htmlLastExperiences = `<div id="ultimesExperiencies" class="titolExperiencia"><h2>Ultimes Experiencies</h2>`;
        
        let maxBaseDades = parseInt(baseDades.length);
        if (maxBaseDades < 5){
            maxBaseDades = maxBaseDades-5;
        }

        let top = 0;
        for (let i = parseInt(baseDades.length)-1; top < 5; i--) {
            console.info(i);  
            let element = baseDades[i]["titol"];
            // console.info(element);
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
        if (document.getElementById("email").value === "" || document.getElementById("passLogin").value === "" ){
            Swal.fire({
                title: "¡ERROR!",
                text: "Has dejado campos vacíos...",
                icon: "error",
            });
        }
        else{
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
                            text: "El usuario y/o contraseña no coincide",
                            icon: "error",
                        });
                    } else {
                        // puede ser null si axios funciona bien pero algo falla en login.php
                        if(respuesta.data.email == null){
                            Swal.fire({
                                title: "¡VAYA!",
                                html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>email undefined",
                                icon: "error",
                            });
                        }
                        else{
                            logeado = true;
                            username = respuesta.data.email;
                            if (respuesta.data.isAdmin == 1){
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
                        html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>"+error,
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
            document.getElementById("username").value === "" || document.getElementById("passRegister").value === ""){
            Swal.fire({
                title: "¡ERROR!",
                text: "Has dejado campos vacíos...",
                icon: "error",
            });
        }
        else{
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
                    }
                    else{
                        // PRINT VISTA DE LOGEADO
                        logeado = true;
                        emailUserLogeado = respuesta2.data.email;
                        transformarSidebar();
                        moduleExperiencia.extraerExperiencias();
                    }
                })
                .catch(function (error) {
                    Swal.fire({
                        title: "¡VAYA!",
                        html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>"+error,
                        icon: "error",
                    });
                    console.log(error);
                })
                .then(function () {
                    //
            });
        }
        
    })


    // JORDI
    // Nova Experiencia
    document.addEventListener('click',function(e){
        if(e.target && e.target.id == 'newExp'){
            // creatFormExp();
            document.getElementById("newExp").disabled = true;
            moduleCategoria.extraerCategorias(username);
        }
    });

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // Funcion para cambiar el contenido del sidebar una vez el usuario se hay logeado
    function transformarSidebar(){
        $('#sidebar').toggleClass('active');
        let sidebar = document.getElementById("sidebar");
        // sidebar.innerHTML=``;
        document.getElementById("sidebarCollapse").innerHTML=`Opciones`;
        sidebar.innerHTML = `<button onClick="window.location.reload();">LOGOUT!</button>`;
        if(isAdmin){
            let sidebarAdmin =
            `<button>Bienvenido admin!</button>`;
            sidebar.insertAdjacentHTML("beforeend", sidebarAdmin);
        }
        else{
            let sidebarNormalUser =
            `<button>tu no eres admin pendejo</button>`;
            sidebar.insertAdjacentHTML("beforeend", sidebarNormalUser);
        }
    }

}