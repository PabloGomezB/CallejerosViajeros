window.onload = function () {

    var logeado = false;
    var idUserLogeado = "";

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

    document.getElementById("login").addEventListener("keyup", function(event) {
        if (event.key === 13) {
            // event.preventDefault();
            document.getElementById("myBtn").click();
        }
    });

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
    
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });

    


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
                            idUserLogeado = respuesta.data.id;
                            console.log(idUserLogeado);
                            transformarSidebar();
                            moduleExperiencia.extraerExperiencias();
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
                    console.log(document.getElementById("nom").value);
                    console.log(document.getElementById("cognom").value);
                    console.log(document.getElementById("username").value);
                    console.log(document.getElementById("passRegister").value);
                    console.log(respuesta2);
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
                        // document.getElementById("div").innerHTML = `id: ${respuesta2.data.id}<br>Email: ${respuesta2.data.email}<br>Password: ${respuesta2.data.password}<br>SESSION: ${respuesta2.data.SESSION}`;
                        logeado = true;
                        idUserLogeado = respuesta2.data.id;
                        console.log(idUserLogeado);
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

    
    //////////////////// Start Nova Experiencia Jordi
    // Printar formulari
    function creatFormExp() {
        let crearFormNovaExperiencia =
        `
        <div id="formNewExp">
            <h2>Nova Experiencia</h2>

            <label for="titolExp">Titol: </label>
            <input type="text" name="titolExp" id="titolExp"><br>

            <label for="dataExp">Data: </label>
            <input type="date" name="dataExp" id="dataExp"><br>

            <label for="textExp">Text:</label>
            <textarea id="textExp" name="textExp" rows="4" cols="50"></textarea><br>

            <div id="categoriaExp">
                <input type="radio" id="r1" name="categoriaExp" value="Aventures" checked="checked">
                <label for="Aventures">Aventures</label><br>
                <input type="radio" id="r2" name="categoriaExp" value="Familiar">
                <label for="Familiar">Familiar</label><br>
                <input type="radio" id="r3" name="categoriaExp" value="Historic">
                <label for="Historic">Historic</label><br>
                <input type="radio" id="r4" name="categoriaExp" value="Muntanyisme">
                <label for="Muntanyisme">Muntanyisme</label><br>
                <input type="radio" id="r5" name="categoriaExp" value="Romantic">
                <label for="Romantic">Romantic</label><br>
            </div>

            <button id="btnCrearExp">Crear</button>
        </div>
        `;

        document.getElementById('newExp').insertAdjacentHTML('afterEnd', crearFormNovaExperiencia);
    }
    // Remove caracters specials
    function escapeHtml(text) {
        let map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
    // Validacio per php
    function testInput(data) {
        data = data.replace(/\\/g," ");
        data = data.trim();
        data = escapeHtml(data);
        return data;
    }
    // Validacio per js
    function validateForm() {
        let titol = document.getElementById('titolExp').value;
        let data = document.getElementById('dataExp').value;
        let text = document.getElementById('textExp').value;
        let categoria = function(){
            if (document.getElementById('r1').checked) {
                return document.getElementById('r1').value;
            } else if (document.getElementById('r2').checked) {
                return document.getElementById('r2').value;
            } else if (document.getElementById('r3').checked) {
                return document.getElementById('r3').value;
            } else {
                return document.getElementById('r4').value;
            }
        }
        let imatge = "https://picsum.photos/400/300";

        if (titol == "") {
            alert("Cal omplir el Titol");
            return false;
        } else if (data == "") {
            alert("Cal omplir la Data");
            return false;
        } else if (text == "") {
            alert("Cal omplir el Text");
            return false;
        } else {
            console.log(testInput(titol));
            console.log(data);
            console.log(testInput(text));
            console.log(categoria());
            console.log(imatge);

            let experiencia = [testInput(titol), data, testInput(text), categoria(), imatge];
            return experiencia;
        }
    }
    // Crear Stringify
    function expToJson(titol, data, text, categoria, imatge) {
        let novaExperiencia = new Map();
        novaExperiencia['titol'] = titol;
        novaExperiencia['data'] = data;
        novaExperiencia['text'] = text;
        novaExperiencia['imatge'] = imatge;
        novaExperiencia['coordenades'] = '0, 0';
        novaExperiencia['categoria'] = categoria;
        novaExperiencia['likes'] = 0;
        novaExperiencia['dislikes'] = 0;
        novaExperiencia['estat'] = 'esborrany';
        return novaExperiencia;
    }

    // Listeners
    // Nova Experiencia
    // document.getElementById("newExp").addEventListener("click", function(){
    //     creatFormExp();
    // })
    document.addEventListener('click',function(e){
        if(e.target && e.target.id == 'newExp'){
            creatFormExp();
            document.getElementById("newExp").disabled = true;
        }
    });
    // Crear Nova Experiencia
    document.addEventListener('click',function(e){
        if(e.target && e.target.id == 'btnCrearExp'){
            if (validateForm()) {
                let experiencia = validateForm();
                console.log(expToJson(experiencia[0], experiencia[1], experiencia[2], experiencia[3], experiencia[4]));
                document.getElementById("formNewExp").style.display = "none";
                document.getElementById("newExp").disabled = false;
            }
        }
    });
    //////////////////// Finish Nova Experiencia Jordi

    // Funcion para cambiar el contenido del sidebar una vez el usuario se hay logeado
    function transformarSidebar(){
        $('#sidebar').toggleClass('active');
        document.getElementById("sidebar").innerHTML=``;
        document.getElementById("sidebarCollapse").innerHTML=`Opciones`;
    }

    function transformarSidebar(){
        $('#sidebar').toggleClass('active');
        document.getElementById("sidebar").innerHTML=``;
        document.getElementById("sidebarCollapse").innerHTML=`Opciones`;
    }
}