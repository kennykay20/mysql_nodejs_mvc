const express = require("express");
const app = express();
const { config } = require("./src/config");
const cors = require("cors");
const allRoutes = require('./src/routers');
const PORT = config.port.HTTP_PORT || 6500;

app.use(express.json());
app.use(
  cors({
    credentials: false,
  })
);

app.use('/', allRoutes);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
