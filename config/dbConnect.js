const monggose = require("mongoose");

const dbConect = async () => {
  try {
    const connect = await monggose.connect(process.env.CONNECTION_STRING);
    console.log(`Database connected : ${connect.connection.host}`);
  } catch (err) {
    console.log(`Error in connecting to the database: ${err}`);
    process.exit(1);
  }
};

module.exports = dbConect;
