function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let inputURL = document.getElementById('name').value
    Client.isValidURL(inputURL)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

export { handleSubmit }
