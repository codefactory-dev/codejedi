/** 
    Function to check whether any of the given parameters is null

    @param  {...*}      values - 1+ values to check if null 
    @return {boolean}
*/
const isNull = (...values) => values.reduce((acc, v) => acc || v == null, false); 


module.exports = { isNull }