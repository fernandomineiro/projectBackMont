const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado com o banco!");
  })
  .catch((err) => {
    console.log("Não contectado com o banco!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Bem vindo a aplicação." });
});

require("./app/routes/person.routes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Seerver rodando na porta ${PORT}.`);
});
