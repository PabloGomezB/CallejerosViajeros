var moduleNewExperiencia = (function (){

    function crearExperiencia(){
        moduleExperiencia.extraerCategorias().then((respuesta) => {
            let categorias = JSON.parse(respuesta.data);
            console.log(categorias);

            // el parametro categorias tiene TODAS las categorias
            // faltaría hacer aqui un forEach exactament igual que el de moduleExperencias linea 33

            // faltan coordenadas y username
            let crearFormNovaExperiencia =
            `
            <div id="formNewExp">
                <h2>Nova Experiencia</h2>

                <label for="titolExp">Titol: </label>
                <input type="text" name="titolExp" id="titolExp"><br>

                <label for="textExp">Text:</label>
                <textarea id="textExp" name="textExp" rows="4" cols="50"></textarea><br>

                <label for="latitud">Latitud entre -90 i 90: </label>
                <input type="number" id="latitudExp" name="latitud" min="-90" max="90"><br><br>

                <label for="longitud">Longitud entre -180 i 180: </label>
                <input type="number" id="longitudExp" name="longitud" min="-180" max="180"><br><br>

            <div id="categoriaExp">`;

            // ForEach para crear los radio buttons según todas las categorias que existan en la base de datos
            categorias.forEach(categoria => {
                // console.log(categoria.nom);
                if (`r${categoria.idCat}` == 'r1') {
                    crearFormNovaExperiencia +=
                        `<input type="radio" id="r${categoria.idCat}" name="categoriaExp" value="${categoria.nom}" checked="checked">
                        <label for="${categoria.nom}labelNewExp" class="labelNewExp">${categoria.nom}</label><br>`;

                } else {
                    crearFormNovaExperiencia +=
                        `<input type="radio" id="r${categoria.idCat}" name="categoriaExp" value="${categoria.nom}">
                        <label for="${categoria.nom}labelNewExp" class="labelNewExp">${categoria.nom}</label><br>`;
                }
            })
            crearFormNovaExperiencia +=
                `</div>
                <button id="btnCrearExp">Crear</button>
            </div>
            `;

            document.getElementById('newExp').insertAdjacentHTML('afterEnd', crearFormNovaExperiencia);



            document.querySelectorAll(".labelNewExp").forEach(labelNewExp => {
                labelNewExp.addEventListener("click", function (e) {
                    // console.log(e.target.innerText);
                    let radios = $('input[type=radio]');
                    for (let index = 0; index < radios.length; index++) {
                        // console.log(radios[index].value);
                        if (e.target.innerText == radios[index].value) {
                            radios[index].checked = "checked";
                        }

                    }
                })
            });



            // Crear Nova Experiencia
            document.addEventListener('click', function (e) {
                if (e.target && e.target.id == 'btnCrearExp') {
                    if (validateForm(categorias)) {
                        let experiencia = validateForm(categorias);
                        experiencia.forEach(element => {
                            console.log(element);
                        });
                        // AQUI SE DEBERÍA INTERAR TODO CON UN FOREACH SOBRE categorias (mismo sistema que en la linea 45)
                        ///////////////////////////////////////////////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////////////////////////////////
                        //PABLO tooo tuyoooo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // console.log(expToJson(experiencia[0], experiencia[1], experiencia[2], experiencia[3], experiencia[4], username));
                        let newExp = expToJson(experiencia[0], experiencia[1], experiencia[2], experiencia[3], experiencia[4], username);
                        // console.log(newExp);
                        document.getElementById("formNewExp").style.display = "none";
                        document.getElementById("newExp").disabled = false;

                        axios.get("./database/experiencias/anadirExp.php", {
                                params: {
                                    titol: newExp["titol"],
                                    text: newExp["text"],
                                    imatge: newExp["imatge"],
                                    coordenades: newExp["coordenades"],
                                    categoria: newExp["categoria"],
                                    username: newExp["username"]

                                }
                            })
                            .then(function (respuesta) {
                                console.log(respuesta);
                                moduleExperiencia.extraerExperiencias();


                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                            .then(function () {

                        });

                    }
                }
            });


        });
    }
    
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    // Remove caracters specials
    function escapeHtml(text) {
        let map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    }

    // Validacio per php
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    function testInput(data) {
        data = data.replace(/\\/g, " ");
        data = data.trim();
        data = escapeHtml(data);
        return data;
    }

    // Validacio per js
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    function validateForm(categorias) {
        let titol = document.getElementById('titolExp').value;
        let text = document.getElementById('textExp').value;
        let latitud = document.getElementById('latitudExp').value;
        let longitud = document.getElementById('longitudExp').value;
        let coordenades;
        let categoriaSel;

        categorias.forEach(categoria => {
            if (document.getElementById(`r${categoria.idCat}`).checked) {
                categoriaSel = `${categoria.idCat}`;
            }
        })

        let imatge = "https://picsum.photos/400/300";

        if (titol == "") {
            alert("Cal omplir el Titol");
            return false;
        } else if (text == "") {
            alert("Cal omplir el Text");
            return false;
        } else if (latitud == "") {
            alert("Cal omplir la latitud");
            return false;
        } else if (latitud < -90 || latitud > 90) {
            alert("Latitud entre -90 i 90");
            return false;
        } else if (longitud == "") {
            alert("Cal omplir la Longitud");
            return false;
        } else if (longitud < -180 || longitud > 180) {
            alert("Longitud entre -180 i 180");
            return false;
        } else {
            coordenades = `${latitud},${longitud}`;

            let experiencia = [testInput(titol), imatge, testInput(text), coordenades, categoriaSel];
            return experiencia;
        }
    }

    // Crear Stringify
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    function expToJson(titol, imatge, text, coordenades, categoria, username) {
        let novaExperiencia = new Map();
        novaExperiencia['titol'] = titol;
        novaExperiencia['text'] = text;
        novaExperiencia['imatge'] = imatge;
        novaExperiencia['coordenades'] = coordenades;
        novaExperiencia['categoria'] = categoria;
        novaExperiencia['username'] = username;
        return novaExperiencia;
    }



    return {
        crearExperiencia: crearExperiencia
    };

})();