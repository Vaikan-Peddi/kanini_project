function sendData() {
    const inputString = document.getElementById('inp').value;
    const tbd = document.getElementById('tbd')

    fetch('http://localhost:3000/callPythonScript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputString }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.result == '0') {
            tbd.innerHTML = "Sorry, negative review, could've done better!"
            tbd.style.color = 'red'
        }
        else {
            tbd.innerHTML = "Yay! A Positive review!"
            tbd.style.color = 'green'
        }
        
    })
    .catch(error => console.error(error));
}
