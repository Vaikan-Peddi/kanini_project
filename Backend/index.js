const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());

app.post('/callPythonScript', async (req, res) => {
    try {
        const inputString = req.body.inputString;

        // Make a request to the Python API
        const response = await axios.post('http://localhost:5000/api/v1/predict', {
            input_string: inputString,
        });

        // Send the Python script's response to the frontend
        res.json({ result: response.data.result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => console.log(`Node.js server running on port ${port}`));
