const express = require('express');
const app = express();

const cors = require('cors');
const Axios = require('axios');
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/compile', (req, res) => {
    const code = req.body.code;
    const language = req.body.language;
    const input = req.body.input;
    const version = req.body.version;
    const data = {
        "language": language,
        "version": version,
        "files": [
            {
                "name": "main",
                "content": code
            }
        ],
        "stdin": input
    };

    let config = {
        method: 'post',
        url: 'https://emkc.org/api/v2/piston/execute',
        headers:{
            'Content-Type': 'application/json'
        },
        data: data
    };

    Axios(config)
        .then((response) => {
            console.log(response.data);
            res.send(response.data.run);
            console.log("---------------------**************************************************************---------------------------------")
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Error');
        });

})


app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});