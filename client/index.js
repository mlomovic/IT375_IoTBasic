const forma = document.querySelector('form');

const domen = 'http://192.168.52.30';
const port = `3000`;





forma.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);

    data = {
        led1State: event.target.led1State.value,
        led2State: event.target.led2State.value,
        led3State: event.target.led3State.value,
        led4State: event.target.led4State.value
    };



    fetch(`${domen}:${port}/leds`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //   mode: 'cors', // no-cors, *cors, same-origin
            //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //   credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            //   redirect: 'follow', // manual, *follow, error
            //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))

})