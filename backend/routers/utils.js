const MongoClient = require("mongodb").MongoClient;
/** 
    Function to check whether any of the given parameters is null

    @param  {...*}      values - 1+ values to check if null 
    @return {boolean}
*/
const isNull = (...values) =>
  values.reduce((acc, v) => acc || v == null, false);

const checkDatabaseActive = async () => {
  try {
    const uri = process.env.MONGODB_URL;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    console.log("Connected successfully to server");
    client.close();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { isNull, checkDatabaseActive };
