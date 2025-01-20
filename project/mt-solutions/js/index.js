document.getElementById('btnLogin').addEventListener('click', function () {
    // Simulate login validation
    var username = document.getElementById('txtLoginUsername').value;
    var password = document.getElementById('txtLoginPassword').value;

    if (username === 'admin' && password === 'password') {
        document.getElementById('msgLoginKO').classList.add('d-none');
        // Perform login actions
    } else {
        document.getElementById('msgLoginKO').classList.remove('d-none');
    }
});

document.getElementById('btnEsci').addEventListener('click', function () {
    // Perform logout actions
});

document.addEventListener('DOMContentLoaded', function () {
    // Rimuovi il codice personalizzato per il toggling del menu
});