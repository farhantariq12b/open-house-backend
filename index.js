const express = require("express");

const routes = require("./src/routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
