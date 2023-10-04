document.addEventListener("DOMContentLoaded", function(event) { 
    document.querySelector(".submit").addEventListener("click", (event) => {
        let submission = document.querySelector('.file-input')
        let form = new FormData();

        form.append('file', submission.files[0]);
        form.append('filename', 'py')

        options = {
            method: "POST", 
            body: form
        }
        
        fetch('http://localhost:8080/api/upload', options)
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
    });
});