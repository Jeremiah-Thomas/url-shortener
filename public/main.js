const form = document.querySelector('#form')
const body = document.body
const newUrl = document.createElement('a')
const longUrlInput = document.querySelector('#long')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const longURL = longUrlInput.value

    fetch(`/api/url/shorten`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({originalUrl: longURL})
    }).then(res => res.json()).then(json => {
        newUrl.href = json
        newUrl.textContent = `http://${json}`
        newUrl.target="_blank"
        body.appendChild(newUrl)

    })

    

})