/** 
    Function to check whether any of the given parameters is null

    @param  {...*}      values - 1+ values to check if null 
    @return {boolean}
*/
const isNull = (...values) => values.reduce((acc, v) => acc || v == null, false); 

// -----------------------------------------------------------------------------
// Rating
// -----------------------------------------------------------------------------

/** 
    Function to recompute the average rating given a newly added rating

    @param  {QBasic} question - question with a newly added rating
    @param  {number} newValue - newly added rating's value 
    @return {number} updated average rating
*/
const calcAvgRating = (question, newValue) => {
    const prevAvgRating = question.avgRatings || 0;
    const prevNbRating = question.nbRatings || 0;
    return ((prevAvgRating*prevNbRating) + newValue) / (prevNbRating+1);
}

module.exports = { isNull, calcAvgRating }