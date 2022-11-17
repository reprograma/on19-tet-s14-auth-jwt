require('dotenv').config();
const app = require("./src/app");

PORT = 3000

app.listen(PORT, () => {console.log(`Servidor está rodando na porta ${PORT}`);
});