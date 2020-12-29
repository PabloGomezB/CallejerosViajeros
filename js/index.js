window.onload = function () {
    
    var logeado = false;
    var username = "";
    var isAdmin = false;

    // $('#sidebar').css("border-right","100px solid #04aef0");
    // Esta funcion gestiona el comportamiento del sidebar
    // $('.borderText').hide();
    // $('#sidebar').toggleClass('active');
    $("#dropDownLogin").click();
    $('#sidebarCollapse').on('click', function () {
        if($('#sidebar').hasClass("active")){
            // add fade-out para el texto de border antes del login
            $('.borderText').removeClass('fade-in');
            $('.borderText').addClass('fade-out');

            // add fade-out para el texto del border logeado
            $('.borderTextLogeado').removeClass('fade-in');
            $('.borderTextLogeado').addClass('fade-out');

            // "animacion" para quitar el border cada vez que se esconde el sidebar
            setTimeout(function(){$('#sidebar').css("border-right","90px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","80px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","70px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","60px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","50px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","40px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","30px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","20px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","10px solid #04aef0");}, 100);
            setTimeout(function(){$('#sidebar').css("border-right","0px solid #04aef0");}, 100);
            
            // setTimeout para ocultar el texto para que el cursor no lo detecte y se pueda hacer click en los inputs
            // 400 de tiempo porque tarda 0.3s en hacer el efecto de fade-out, sino se iría de golpe antes de que termine la animacion
            setTimeout(function(){$('.borderText').css("display","none");}, 400);
        }
        else{
            // add fade-in para el texto de border antes del login
            $('.borderText').removeClass('fade-out');
            $('.borderText').addClass('fade-in');
            setTimeout(function(){$('.borderText').css("display","initial");}, 100);

            // add fade-in para el texto del border logeado
            $('.borderTextLogeado').removeClass('fade-out');
            $('.borderTextLogeado').addClass('fade-in');

            // se restablece el border del sidebar cuando se esconde
            $('#sidebar').css("border-right","100px solid #04aef0");
        }
        $('#sidebar').toggleClass('active');
    });

    // $('#sidebarCollapse').click();
    // $("#dropDownLogin").click();
    // $("#email").focus();
    // $('#desplegableLogin').removeClass('collapse');
   


    // Estas dos funciones resetean los campos de los formularios además de esconderlos en caso de hacer click en uno u otro
    document.getElementById("dropDownLogin").addEventListener("click", function(){
        // $("#dropDownRegistro").click();
        let formRegistro = document.querySelector("#formRegistro");
        formRegistro.querySelectorAll("input.form-control").forEach(input => {
            input.value = ``;
        })
        formRegistro.querySelector(".checkboxPass").checked = false;
        document.getElementById("email").focus();
    })
    document.getElementById("dropDownRegistro").addEventListener("click", function(){
        // $("#dropDownLogin").click();
        let formLogin = document.querySelector("#formLogin");
        formLogin.querySelectorAll("input.form-control").forEach(input => {
            input.value = ``;
        })
        formLogin.querySelector(".checkboxPass").checked = false;
        document.getElementById("nom").focus();
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
                            text: "El usuario y/o contraseña no coinciden",
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

        // Esconder el sidebar y añadir el border
        $('#sidebar').toggleClass('active');
        $('#sidebar').css("border-right","100px solid #04aef0");

        // Construir la misma estructura para añadir texto al border
        document.getElementById("sidebarCollapse").innerHTML=`Opciones`;
        sidebar.innerHTML = `
        <span class="borderTextLogeado">
            Opciones
        </span>
        <button onClick="window.location.reload();">LOGOUT!</button>`;

        // Si es admin saldrá el boton de admin y logout, sino solo logout
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