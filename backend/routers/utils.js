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
    Function to calculate the average rating given a newly added rating

    @param  {QBasic} question - question with a newly added rating
    @param  {number} newValue - newly added rating's value 
    @return {number} updated average rating
*/
const addAvgRating = (question, newValue) => {
    const prevAvgRating = question.avgRatings || 0;
    const prevNbRating = question.nbRatings || 0;
    return ((prevAvgRating*prevNbRating) + newValue) / (prevNbRating+1);
}

/** 
    Function to calculate the average rating given a newly updated rating

    @param  {QBasic} question - question with a newly added rating
    @param  {number} prevValue - previous rating's value 
    @param  {number} newValue - newly added rating's value 
    @return {number} updated average rating
*/
const updateAvgRating = (question, prevValue, newValue) => {
    const prevAvgRating = question.avgRatings;
    return ((prevAvgRating * question.nbRatings) + (newValue - prevValue)) / question.nbRatings;
}

module.exports = { isNull, addAvgRating, updateAvgRating }