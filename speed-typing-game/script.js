const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement  = document.getElementById('quoteDisplay')
const quoteDisplayinput    = document.getElementById('quoteInput')
const timerElement         = document.getElementById('timer')

quoteDisplayinput.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteDisplayinput.value.split('')

    let correct = true
    
    arrayQuote.forEach((characterSpan, idx) => {
        const character = arrayValue[idx]
        if ( character == null ) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')

            correct = false

        } else if ( character === characterSpan.innerText ){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')

            correct = false
        }
    })

    if (correct) RenderQuote()
})

function getRandomQuote () {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}
async function RenderQuote () {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ""
    quote.split('').forEach( character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    quoteDisplayElement.value = null
    startTimer()
}

let startTime
function startTimer () {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
       timer.innerText =  getTimerTime()
    }, 1000)
}

function getTimerTime () {
    return Math.floor((new Date() - startTime) / 1000)
}
RenderQuote()