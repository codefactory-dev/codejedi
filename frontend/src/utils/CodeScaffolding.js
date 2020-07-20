function CodeScaffolding(entries)
{
    var CodeScaffolding = 
    `
        /*---------------ENTRIES---------------*/
        var entries = ${JSON.stringify(entries)};
        var gotRightAmount = 0;
        for(var i=0;i<entries.length;i+=2)
        {
            var result = levelOrder(entries[i]);
            if (result === entries[i+1])
            {
                gotRightAmount++;
            }
        }
    `;
    return CodeScaffolding;
}


module.exports = CodeScaffolding