const express = require("express");
const votos = require("./routes/votos.routes");

const app = express();

app.use('/votos.routes', votos);

app.listen(8080);