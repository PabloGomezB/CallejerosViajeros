window.onload = function () {
    $(document).ready(function () {
        $('#sidebar').toggleClass('active');
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
        $("#dropDownLogin").click();
        $('#desplegableLogin').removeClass('collapse');
    });

    document.getElementById("checkEye").addEventListener("click", function () {
        let pass = document.getElementById("passLogin");
        if (pass.type === "password") {
            pass.type = "text";
        } else {
            pass.type = "password";
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
            // axios.get('database/login/login.php', {
                    params: {
                        email: document.getElementById("email").value,
                        pass: document.getElementById("passLogin").value
                    }
                })
                .then(function (respuesta) {
                    // console.log(respuesta);
                    if (respuesta.data.status == "FAIL") {
                        Swal.fire({
                            title: "¿Tienes cuenta?",
                            text: "El usuario y/o contraseña no coincide",
                            icon: "error",
                        });
                    } else {
                        // puede ser null si axios funciona bien pero algo falla en login.php
                        if(respuesta.data.id == null){
                            Swal.fire({
                                title: "¡VAYA!",
                                html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>id undefined",
                                icon: "error",
                            });
                        }
                        else{
                            console.log("LOGEADO");
                            extraerExperiencias();
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
        axios.get('http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/usuari/register.php', {
                params: {
                    nom: document.getElementById("nom").value,
                    cognom: document.getElementById("cognom").value,
                    username: document.getElementById("username").value,
                    pass: document.getElementById("pass").value
                }
            })
            .then(function (respuesta2) {
                // PRINT VISTA DE LOGEADO
                document.getElementById("div").innerHTML = `id: ${respuesta2.data.id}<br>Email: ${respuesta2.data.email}<br>Password: ${respuesta2.data.password}<br>SESSION: ${respuesta2.data.SESSION}`;
                console.log(respuesta2);
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
    })

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
                htmlExperiences += `<buttom posicion="${index}" id="like${index}" class="btn btn-primary like">Like</buttom>`;
            
                htmlExperiences += '<div class="divDis">';
                htmlExperiences += `<buttom posicion="${index}" id="dislike${index}" class="btn btn-primary dislike">Dislike</buttom>`;
                htmlExperiences += `<p class="number">${element.dislikes}</p>`;
                htmlExperiences += '</div>';
                
                // if (USUARIO == PROPIETARIO EXP) {
                        htmlExperiences += `<buttom posicion="${index}" id="editar${index}" class="btn btn-primary a editar">Editar</buttom>`;
                // }
                
                htmlExperiences += `<buttom posicion="${index}" id="eliminar${index}" class="btn btn-primary a eliminar">Eliminar</buttom>`;
                htmlExperiences += `<buttom posicion="${index}" id="reportar${index}" class="btn btn-primary b reportar">Reportar</buttom>`;
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

        document.querySelectorAll(".editar").forEach(experencia => {
            experencia.addEventListener("click", function(e) {
                    console.info(e.target);
                    console.info(e.target.id);
                    let posArray = e.target.getAttribute("posicion");
                    console.info(posArray);
            })
        });

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

        document.querySelectorAll(".reportar").forEach(experencia => {
            experencia.addEventListener("click", function(e) {
                    console.info(e.target);
                    console.info(e.target.id);
                    let posArray = e.target.getAttribute("posicion");
                    console.info(posArray);
            })
        });
    }
    //////// Finish Print Experiencies Jordi
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

    function deleteExp (idUsu) {
        axios.get("deleteExp.php",{
            params: {
                idUsu: idUsu
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


}