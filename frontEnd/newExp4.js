var moduleCategoria = (function () {

    function extraerCategorias(username, callFromSetBuscador){
        var x = "null";
        axios.get("http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/categoria/categoria.php",{
        })
        .then(function (respuesta){

            let categorias = JSON.parse(respuesta.data);
            if (callFromSetBuscador === true){
                // PORQUE ESTO NO HACE RETURN DE CATEGORIAS
                x = categorias;
                // return categorias;
            }
            else{
                creatFormExp(categorias, username);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            if (callFromSetBuscador === true){
                return x;
            }
        });
    }


    //////////////////////////////////////////////////////////////////////////////////
    //////////   CODIGO !!!PRUEBA!!! PARA CREAR UNA EXPERIENCIA   ////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    function creatFormExp(categorias, username) {

        // el parametro categorias tiene TODAS las categorias
        // faltaría hacer aqui un forEach exactament igual que el de moduleExperencias linea 33

        // faltan coordenadas y username
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

            <label for="latitud">Latitud entre -90 i 90: </label>
            <input type="number" id="latitudExp" name="latitud" min="-90" max="90"><br><br>

            <label for="longitud">Longitud entre -180 i 180: </label>
            <input type="number" id="longitudExp" name="longitud" min="-180" max="180"><br><br>

            <div id="categoriaExp">`;

            // ForEach para crear los radio buttons según todas las categorias que existan en la base de datos
            categorias.forEach(categoria => {
                console.log(categoria.nom);
                crearFormNovaExperiencia +=
                `<input type="radio" id="r${categoria.id}" name="categoriaExp" value="${categoria.nom}" checked="checked">
                <label for="${categoria.nom}">${categoria.nom}</label><br>`;
            })
            crearFormNovaExperiencia +=
            `</div>
            <button id="btnCrearExp">Crear</button>
        </div>
        `;

        document.getElementById('newExp').insertAdjacentHTML('afterEnd', crearFormNovaExperiencia);

        // Crear Nova Experiencia
        document.addEventListener('click',function(e){
            if(e.target && e.target.id == 'btnCrearExp'){
                if (validateForm()) {
                    let experiencia = validateForm();

                    // AQUI SE DEBERÍA INTERAR TODO CON UN FOREACH SOBRE categorias (mismo sistema que en la linea 45)
                    ///////////////////////////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////////////////////////////////////////////////////
                    console.log(expToJson(experiencia[0], experiencia[1], experiencia[2], experiencia[3], experiencia[4], experiencia[5], username));
                    document.getElementById("formNewExp").style.display = "none";
                    document.getElementById("newExp").disabled = false;
                }
            }
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
        
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Validacio per php
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    function testInput(data) {
        data = data.replace(/\\/g," ");
        data = data.trim();
        data = escapeHtml(data);
        return data;
    }

    // Validacio per js
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    function validateForm() {
        let titol = document.getElementById('titolExp').value;
        let data = document.getElementById('dataExp').value;
        let text = document.getElementById('textExp').value;
        let latitud = document.getElementById('latitudExp').value;
        let longitud = document.getElementById('longitudExp').value;
        let coordenades;


        // AQUI SE DEBERÍA INTERAR TODO CON UN FOREACH SOBRE categorias (mismo sistema que en la linea 45)
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////
        // document.getElementById('r1').value es hardcoded y no sirve!
        // debería ser algo como 
        //  categorias.forEach(categoria => {    
        //      document.getElementById('r${categoria.id}').value
        //  }
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
            // console.log(testInput(titol));
            // console.log(data);
            // console.log(testInput(text));
            // console.log(categoria());
            // console.log(imatge);
            // console.log(latitud);
            // console.log(longitud);
            // console.log(coordenades);

            let experiencia = [testInput(titol), data, testInput(text), coordenades, categoria(), imatge];
            return experiencia;
        }
    }

    // Crear Stringify
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    function expToJson(titol, data, text, coordenades, categoria, imatge, username) {
        let novaExperiencia = new Map();
        novaExperiencia['titol'] = titol;
        novaExperiencia['data'] = data;
        novaExperiencia['text'] = text;
        novaExperiencia['imatge'] = imatge;
        novaExperiencia['coordenades'] = coordenades;
        novaExperiencia['categoria'] = categoria;
        novaExperiencia['likes'] = 0;
        novaExperiencia['dislikes'] = 0;
        novaExperiencia['estat'] = 'esborrany';
        ovaExperiencia['username'] = username;
        return novaExperiencia;
    }

    return {
        extraerCategorias: extraerCategorias
    };

})();