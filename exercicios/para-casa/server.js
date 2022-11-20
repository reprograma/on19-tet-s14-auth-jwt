const app = require("./src/app");

PORT = 3030;

app.listen(PORT, () => {
    console.log(`The server is listening on: ${PORT}`);
});