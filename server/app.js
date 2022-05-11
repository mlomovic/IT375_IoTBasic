const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
    Led,
    Board,
    Thermometer
} = require('johnny-five');

const PORT = 3000;

const app = express();
const board = new Board();


app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(express.json());


const ledStates = [0, 0, 0, 0]



// const board = new Board();

// board.on('ready', () => {
//     const led1 = new Led(2);
//     const led2 = new Led(3);

//     led1.on();

// })


app.get('/', (req, res) => {
    // console.log(req);
    res.send('<h2>pozdrav svima</h2>');
});


app.get('/leds/:interval', (req, res) => {
    let interval = req.params.interval ? req.params.interval : 1000;
    // console.log(currentId);




    const led1 = new Led(2);

    // led1.blink(Number(interval))

    if (interval == 1) {
        led1.on();
    }
    if (interval == 0) {
        led1.off();
    }

    delete Led.led1;

    res.json({
        'lampica_interval': interval
    });
});

app.post('/leds', (req, res) => {

    // let led1State = req.body.led1State;
    // let led2State = req.body.led2State;
    // let led3State = req.body.led3State;
    // let led4State = req.body.led4State;

    const ledInput = [req.body.led1State, req.body.led2State, req.body.led3State, req.body.led4State]

    const ledArray = [new Led(2), new Led(3), new Led(4), new Led(5)];

    for (let i = 0; i < ledArray.length; i++) {
        
        if (ledInput[i] == 0) {
            ledArray[i].off();
            // continue;
        }

        if (ledInput[i] == 1) {
            ledArray[i].on();
        }

    }

    res.json({
        led1: ledInput[0],
        led2: ledInput[1],
        led3: ledInput[2],
        led4: ledInput[3],
    });

    // res.redirect('http://localhost:5500/client/index.html')

});



app.get('/temp', (req, res) => {

    let temp = new Thermometer({
        controller: "DS18B20",
        pin: "A0"
      });

      try {
          temp.on("data", () => {
            console.log("celsius: %d", this.C);
            console.log("fahrenheit: %d", this.F);
            console.log("kelvin: %d", this.K);
            res.send(`<h2>Trenutna temperatura je ${this.C} C</h2>`);
          });
          
      } catch (error) {
          console.log(error);
      }
      
    // console.log(req);
});



board.on('ready', () => {

    app.listen(PORT, () => {
        console.log(`... Server slusa na portu ${PORT}...`);
    })

});