const mongoose = require("mongoose");

const File = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    // Deve ser definida essas opções para acessar o método abaixo automaticamente
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

// Criar campo virtual que existe apenas no lado do código e não na tabela do banco

File.virtual("url").get(function() {
  // Configuração de url para variáveis de ambiente
  const url = process.env.URL || "http://localhost:3000";

  return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);
