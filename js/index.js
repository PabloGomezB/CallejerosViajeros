// este js sirve para buscar al usuario introducido en el form del login
window.onload = function () {

    $(document).ready(function () {
        // $('#sidebar').toggleClass('active');
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });

    document.getElementById("checkEye").addEventListener("click", function () {
        let pass = document.getElementById("passLogin");
        if (pass.type === "password") {
            pass.type = "text";
        } else {
            pass.type = "password";
        }
    });

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
                            // PRINT VISTA DE LOGEADO
                            let username=respuesta.data.email;
                            document.getElementById("div").innerHTML = `id: ${respuesta.data.id}<br>Email: ${respuesta.data.email}<br>Password: ${respuesta.data.password}<br>SESSION: ${respuesta.data.SESSION}`;
                            // axios.get('http://labs.iam.cat/~a18pabgombra/CallejerosViajeros/database/login/doLogin.php', {
                            //         params: {
                            //             login: true,
                            //             email: username
                            //         }
                            //     })
                            //     .then(function (respuesta2) {
                            //         console.log(respuesta2);
                            //     })
                            //     .catch(function (error) {
                            //         Swal.fire({
                            //             title: "¡VAYA!",
                            //             html: "Ha ocurrido un error inesperado<br>Contacte con Administrador :)<br><br>Mensaje:<br>"+error,
                            //             icon: "error",
                            //         });
                            //         console.log(error);
                            //     })
                            //     .then(function () {
                            //         //
                            // });
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
}