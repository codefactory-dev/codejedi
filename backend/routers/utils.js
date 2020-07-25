const isNull = (...values) => values.reduce((acc, v) => acc || v == null, false); 

module.exports = { isNull }