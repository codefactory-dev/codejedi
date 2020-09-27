const questionTypes = require('../../utils/questionTypes.js');

function CodeScaffolding(entries, userSolution, hiddenSolution,questionType, entryFunction)
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
import java.util.*;
${userSolution}
${hiddenSolution}
class Main {
    public static void main(String[] args) {
        int[][] convertedEntries = new int[][]${JSON.stringify(entries).replaceAll('[','{').replaceAll(']','}')};
        int gotRightAmount = 0;
        try
        {
            Solution objUser = new Solution();
            HiddenSolution objHidden = new HiddenSolution();
            for(int i=0;i<convertedEntries.length;i++)
            {
                int[] entry = convertedEntries[i];
                List<Integer> userResult = objUser.${entryFunction}(entry);
                List<Integer> hiddenResult = objHidden.${entryFunction}(entry);
                System.out.println("case "+i+": "+userResult+":"+hiddenResult);
                if (userResult.equals(hiddenResult))
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

const integerScaffold = (entries, userSolution, hiddenSolution, entryFunction) =>
`
import java.util.*;
${userSolution}
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
                int userResult = objUser.${entryFunction}(entry);
                int hiddenResult = objHidden.${entryFunction}(entry);
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
`
import java.util.*;
${userSolution}
${hiddenSolution}
class Main {
    public static void main(String[] args) {
        String[] convertedEntries = new String[]${JSON.stringify(entries).replace('[','{').replace(']','}')};
        int gotRightAmount = 0;
        try
        {
            Solution objUser = new Solution();
            HiddenSolution objHidden = new HiddenSolution();
            for(int i=0;i<convertedEntries.length;i++)
            {
                String entry = convertedEntries[i];
                String userResult = objUser.${entryFunction}(entry);
                String hiddenResult = objHidden.${entryFunction}(entry);
                System.out.println("case "+i+": "+userResult+":"+hiddenResult);
                if (userResult.equals(hiddenResult))
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


module.exports = CodeScaffolding