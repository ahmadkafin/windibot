require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cmn = require('./app/common/basepath.common')
const sckWa = require('./app/utils/waConnection.utils')

const app = express();
const corsOptions = {
    origin: 'http://127.0.0.1:8080'
}
// require('./app/utils/')

sckWa.connectionToWhatsapp();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('../public'));
app.use(express.urlencoded({ extended: true }));


app.get(`${cmn.base_path}/home`, (req, res) => {
    res.json({
        message: "Homepage"
    })
});

require('./app/routes/index')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
    console.log(`Your base url is localhost:8080${cmn.base_path}/`)
})
