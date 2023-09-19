document.addEventListener("DOMContentLoaded", function(event) {
    let button = document.querySelector(".ping");
    button.addEventListener("click", (e) => {
        fetch('http://localhost:8080/ping', {
            method: "GET",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error.message);
            console.log(error);
        })
    })
});