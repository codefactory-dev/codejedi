const questionTypes = require('../../utils/questionTypes.js');

function CodeScaffolding(entries, userSolution, hiddenSolution,questionType, entryFunction="solution")
{
    let CodeScaffolding;
    switch(questionType){
        case questionTypes.String:
            return stringScaffold(entries,userSolution,hiddenSolution,entryFunction);
        case questionTypes.Array:
            return arrayScaffold(entries,userSolution,hiddenSolution,entryFunction);
        case questionTypes.Integer:
            return integerScaffold(entries,userSolution,hiddenSolution,entryFunction);
    }

}

const arrayScaffold = (entries, userSolution, hiddenSolution,entryFunction) =>
`
class Main {
 
public static void main(String[] args) {
    try
    {
        MyProgram7 obj = new MyProgram7 ();
        obj.run (args);
    }
    catch (Exception e)
    {
        e.printStackTrace ();
    }
}

// instance variables here

public void run (String[] args) throws Exception
{
    // put your code here
}
}`;

const integerScaffold = (entries, userSolution, hiddenSolution, entryFunction) =>
`
${hiddenSolution}
class Main {
    public static void main(String[] args) {
        int[] convertedEntries = new int[]${JSON.stringify(entries).replace('[','{').replace(']','}')};
        int gotRightAmount = 0;
        try
        {
            Solution objUser = new Solution();
            HiddenSolution objHidden = new HiddenSolution();
            for(int i=0;i<convertedEntries.length;i++)
            {
                int entry = convertedEntries[i];
                int userResult = objUser.countPrimes(entry);
                int hiddenResult = objHidden.countPrimes(entry);
                System.out.println("case "+i+": "+userResult+":"+hiddenResult);
                if (userResult == hiddenResult)
                {
                    gotRightAmount++;
                }
            }
            System.out.println("Accepted ! Cases passed: "+gotRightAmount+ "/"+convertedEntries.length);
        }
        catch (Exception e)
        {
            e.printStackTrace ();
        }
    }
}`;

const stringScaffold = (entries, userSolution, hiddenSolution, entryFunction) =>
` /*---------------ENTRIES---------------*/
const entries = ${JSON.stringify(entries)};
var userSolution = function(argument){
    ${userSolution}
    return ${entryFunction}(argument);
};
var hiddenSolution = ${hiddenSolution};
var gotRightAmount = 0;
for(var i=0;i<entries.length;i++)
{

    let entry = entries[i].substring(1,entries[i].length-1);
    var result = userSolution(entry);
    var hiddenResult = hiddenSolution(entry);
    console.log("case "+i+": "+result+":"+hiddenResult);
    if (result === hiddenResult)
    {
        gotRightAmount++;
    }
}

console.log('Accepted ! Cases passed: '+gotRightAmount+ '/'+entries.length);`;


module.exports = CodeScaffolding