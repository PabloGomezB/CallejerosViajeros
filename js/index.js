window.onload = function(){

    document.getElementById("login").addEventListener("click",function(){
    console.log(document.getElementById("email").value);
    console.log(document.getElementById("pass").value);

    axios.get('http://labs.iam.cat/~a18pabgombra/Alvaro/UF4/API%20Rest%20PHP/dataBase.php', {
        params: {
            user: document.getElementById("email").value,
            pass: document.getElementById("pass").value
        }
    })
    .then(function(respuesta){
        console.log(respuesta);
        if(respuesta.data.status=="fail"){
            alert("Te has equivocado");
        }
        else{
            document.getElementById("login").innerHTML=`id: ${respuesta.data.id}`;
        }
    })
    .catch(function(error){
        console.log(error);
    })
    .then(function(){
        document.getElementById("gif").style.display="none";
    });
})

}