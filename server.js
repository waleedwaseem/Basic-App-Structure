const port = 4000; // pull it from the config
const app = require("./app.js");

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
