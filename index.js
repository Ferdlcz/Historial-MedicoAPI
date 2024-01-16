const express = require("express");
require("./Config/Database");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const HistorialMedicoRoute = require("./Routes/HistorialMedico");
const UsersRoute = require("./Routes/UsersRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());

app.use("/api", HistorialMedicoRoute);
app.use("/api", UsersRoute);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
