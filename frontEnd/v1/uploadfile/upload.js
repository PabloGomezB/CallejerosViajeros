// Definiu l'URL de processament i l'element del formulari
const url = 'upload.php';
const form = document.querySelector('form');

// Listen form submit
form.addEventListener('submit', e => {
    // evitar que es desencadeni l'acció predeterminada
    e.preventDefault();

    // Gather files and begin FormData
    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();

    // Afegeix fitxers a files array
    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        formData.append('files[]', file);
    }

    // asincro
    fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => {
        return response.text();
    }).then(data => {
        console.log(data);
    });
});