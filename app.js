const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const routes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

app.use(cors({ origin: "*" }));
app.use("/app", routes);

app.listen(port, () => {
  console.log(`escuchando puerto ${port}`);
});

module.exports = app;
