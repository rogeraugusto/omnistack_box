const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Define para o frontend acessar o backend estando em um domínio diferente
// Permite melhorar a config e limitar algumas coisas
app.use(cors);

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    // Permite criar uma sala específica para o usuário
    socket.join(box);
  });
});

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-fvcvv.mongodb.net/omnistack?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io; // Passa uma informação global pra aplicação definindo uma nova varialvel dentro de req
  return next(); // se não tiver a requisição para aqui dentro
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

// Configuração de url para variáveis de ambiente
server.listen(process.env.PORT || 3000);
