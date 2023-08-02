let alertValue = 10

function checkArb() {
    alertValue = 10
    const xhr = new XMLHttpRequest()
    const noarb = document.querySelector('.no-arb')
    xhr.open("GET", "https://runeapi.sourov.dev/runeapi")
    xhr.send()
    xhr.onload = function () {
        if (xhr.status === 200) {
            let obj = JSON.parse(xhr.responseText)
            if (obj.length > 0) {
                noarb.innerHTML = ""
                const table = document.querySelector('.table')
                const children = table.children
                for (let i = children.length - 1; i >= 1; i--) {
                    table.removeChild(children[i])
                }
                table.classList.remove("hidden")
                const tbody = document.createElement('tbody')

                const alert = document.querySelector('.alert')
                tbody.classList.add("divide-y", "divide-gray-300", "border-b-2")

                table.appendChild(tbody)
                let notify = false
                obj.forEach((element) => {
                    if ('halt' in element) {
                        pass
                    } else {
                        let newObj = {
                            'token': element['token'], 'binance': element['binance'], 'thorchain': element['thorchain'],
                            'bncPrice': element['bncPrice'], 'thorPrice': element['thorPrice'], 'profit': element['profit']
                        }
                        let tr = document.createElement('tr')
                        tbody.appendChild(tr)
                        for (const [key, value] of Object.entries(newObj)) {
                            let td = document.createElement('td')
                            if (value == 'BUY') {
                                td.classList.add("p-3", "text-sm", "text-white", "text-amber-700", "text-center", "font-semibold", "bg-green-700", "border-4", "border-black")
                            } else if (value == 'SELL') {
                                td.classList.add("p-3", "text-sm", "text-white", "text-center", "font-semibold", "bg-red-600", "border-4", "border-black")
                            } else if (key == 'profit') {
                                td.classList.add("text-2xl", "text-red-600", "text-center", "font-semibold", "bg-lime-400", "border-4", "border-black")

                            } else {
                                td.classList.add("p-3", "text-amber-800", "text-center", "font-semibold", "bg-yellow-300", "border-4", "border-black")
                            }
                            if (key == 'profit') {
                                if (value >= alertValue) {
                                    notify = true
                                }
                                td.innerHTML = '$' + value
                            } else {
                                td.innerHTML = value
                            }
                            tr.appendChild(td)
                        }
                    }
                })
                if (notify) {
                    alert.play()
                }
            } else {
                const table = document.querySelector('.table')
                table.classList.add("hidden")
                noarb.innerHTML = "No arbitrage found"
            }
        } else {
            console.error("Api returned non 200")
            document.alert("Api returned non 200")
        }
    }
    xhr.onerror = function () {
        // Request encountered an error, handle the error
        console.error("Request failed due to a network error or a failed request.")
    }
}


function setLimit() {
    const input = document.querySelector('input')
    alertValue = Number(input.value)
    const textAlert = document.querySelector('.text-alert')
    textAlert.textContent = "Alert limit has been set"
    setTimeout(() => {
        textAlert.textContent = ""
    }, 3500)

}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Call the function initially
    checkArb()

    // Call the function every 15 seconds
    setInterval(checkArb, 15000) // 15000 milliseconds = 15 seconds
})
