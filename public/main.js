const form = document.querySelector('#form')
const body = document.body
const newUrl = document.createElement('a')
const newUrlDiv = document.createElement('div')
const copyBtn = document.createElement('img')
copyBtn.src = 'Copy-32.png'
newUrlDiv.classList.add('new-url')
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

        newUrl.href = `http://${json}`
        newUrl.textContent = json
        newUrl.target="_blank"
        newUrlDiv.appendChild(newUrl)
        newUrlDiv.appendChild(copyBtn)
        body.appendChild(newUrlDiv)

        copyBtn.addEventListener('click', async (e) => {
            await navigator.clipboard.writeText(`http://${json}`)
            alert('Link copied')
        })

    })

    

})