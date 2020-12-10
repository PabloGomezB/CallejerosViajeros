// este js sirve para buscar al usuario introducido en el form del login
window.onload = function () {

    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });

    document.getElementById("login").addEventListener("click", function () {

        axios.get('http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/login/login.php', {
                params: {
                    email: document.getElementById("email").value,
                    pass: document.getElementById("pass").value
                }
            })
            .then(function (respuesta) {
                if (respuesta.data.status == "fail") {
                    alert("Te has equivocado");
                } else {
                    // SI ENTRA AQUI QUIERE DECIR QUE EL USUARIO EXISTE, POR LO QUE SE TENDRÁ QUE CREAR UNA SESION PARA ESE EMAIL VIA PHP
                    // (REDIRIGE A OTRO PHP PARA CREAR LA SESION MEDIANTE AXIOS)
                    document.getElementById("div").innerHTML = `id: ${respuesta.data.id}<br>Email: ${respuesta.data.email}<br>Password: ${respuesta.data.password}`;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                //
            });

    })

}