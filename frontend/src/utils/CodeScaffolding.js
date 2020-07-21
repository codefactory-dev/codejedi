function CodeScaffolding(entries)
{
    var CodeScaffolding = 
` /*---------------ENTRIES---------------*/
var entries = ${JSON.stringify(entries)};
var gotRightAmount = 0;
for(var i=0;i<entries.length;i+=2)
{
    var result = someFunction(entries[i]);
    if (result === entries[i+1][0])
    {
        gotRightAmount++;
    }
}
console.log('Accepted ! Cases passed: '+gotRightAmount);`
    return CodeScaffolding;
}


module.exports = CodeScaffolding