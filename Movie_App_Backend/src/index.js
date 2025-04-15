require("dotenv").config()
const app = require('./app.js');
const { connectDb } = require('./Db/connect.js');

connectDb()
  .then(() => {
    app.listen(5000, () =>
      console.log("Server is running on the port 5000")
    );
  })
  .catch(err => console.log(err));

  