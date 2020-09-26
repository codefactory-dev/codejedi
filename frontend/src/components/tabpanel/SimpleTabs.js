import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CodeEditor from '../CodeEditor/CodeEditor.js';
import EditorTestcases from '../EditorTestCases/EditorTestcases.js';
import Editor from '../Editor/Editor.js'
import { Parse, ParseString } from '../../utils/Parser'
import CodeScaffolding from '../../utils/CodeScaffolding'
import { ConvertCodeToOneLiner } from '../../utils/TextReadingUtils'
import axios from 'axios'
import questionTypes from '../../utils/questionTypes.js'
import languageTypes from '../../utils/languageTypes.js'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [editorValue, setEditorValue] = useState(`Given a string s of lower and upper case English letters.\n\nA good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:\n\n0 <= i <= s.length - 2\ns[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.\nTo make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.\n\nReturn the string after making it good. The answer is guaranteed to be unique under the given constraints.\n\nNotice that an empty string is also good.\n\n \n\nExample 1:\n\nInput: s = "leEeetcode"\nOutput: "leetcode"\nExplanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".\nExample 2:\n\nInput: s = "abBAcC"\nOutput: ""\nExplanation: We have many possible scenarios, and all lead to the same answer. For example:\n"abBAcC" --> "aAcC" --> "cC" --> ""\n"abBAcC" --> "abBA" --> "aA" --> ""\nExample 3:\n\nInput: s = "s"\nOutput: "s"\n \n\nConstraints:\n\n1 <= s.length <= 100\ns contains only lower and upper case English letters.`);
  const [code, setCode] = useState("class Solution {\n    public String makeGood(String s) {\n        \n    }\n}");
  const [editorTestcasesValue, setEditorTestcasesValue] = useState('"leEeetcode"\n"abBAcC"\n"s"');
  const [questionType,setQuestionType] = useState(questionTypes.String);
  const [languageType, setLanguageType] = useState(languageTypes.Java)
  


  useEffect(()=>{
    if (props.shouldSubmit)
    {
      console.log("calling submitAll");
      submitAll();
      props.setShouldSubmit(false);
    }
  },[props.shouldSubmit])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function submitAll()
  {
      
      //get question from somewhere
      var questionText = code;

      //get solution from database
      var hiddenSolution = `class HiddenSolution {\n  public String makeGood(String s) {\n    \n    /*\n    Runtime: 1 ms, faster than 100.00% of Java online submissions for Make The String Great.\n    Memory Usage: 37.9 MB, less than 100.00% of Java online submissions for Make The String Great.\n	Runtime complexity: O(n)\n	Space complexity: O(n), since we duplicate the input String in a StringBuilder\n    */\n\n    // edge case\n    if (s.isEmpty()) {\n      return s; // an empty String is a good String per problem requirements\n    }\n\n    StringBuilder sb = new StringBuilder(s); // our working space and what we'll return\n    \n    int index = 0; // to keep track of where in the StringBuilder we are\n    \n    while (index < sb.length() - 1) {\n      if (Math.abs(sb.charAt(index) - sb.charAt(index + 1)) == 32) { // if lower-upper pair is found\n        sb.deleteCharAt(index);\n        sb.deleteCharAt(index);\n        index = Math.max(index - 1, 0); // thanks to @prdp89 for the tip!\n      } else {\n        ++index; // move on to next char\n      }\n    }\n    \n    return sb.toString();\n  }\n}`;
            
      //get test cases from file  
      var testCasesText = editorTestcasesValue;
  
      //parse test cases into javascript
      var structure = Parse(testCasesText, questionType);
      console.log("---PARSED STRUCTURE---");
      console.log(structure);
  
      //insert test cases into question
      var togetherText = questionText;
      togetherText+=CodeScaffolding(structure, code, hiddenSolution, questionType,languageType,"makeGood");
      
  
      console.log("---TOGETHER TEXT---");
      console.log(togetherText);
  
      //transform question into a "sendable" one-line string for json
      var oneLiner = ConvertCodeToOneLiner(togetherText);
      console.log("---ONE LINER---");
      console.log(oneLiner);
  
  
      createEditor();
  
      // POST both the question and the test cases
      async function createEditor() {
          
          const result = await axios({
              method: 'post',
              url: '/compile',
              data: { 
                  code:oneLiner,
                  language:languageType
              }
          });            
          console.log(Object.getOwnPropertyNames(result))
          const {stdout, stderr, error} = result.data;
          console.log("stdout: "+stdout+", stderr: "+stderr+", error: "+error);
          if (stderr || error)
          {
              return props.setAnswer(stderr +' '+ error)
          }
          return props.setAnswer(stdout);
      }
  }
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="simple tabs example"
            variant="fullWidth"
          >
          <Tab className={classes.removeCaps} label="Question" {...a11yProps(0)} />
          <Tab className={classes.removeCaps} label="Solution" {...a11yProps(1)} />
          <Tab className={classes.removeCaps} label="Test Cases" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.editor} value={value} index={0}>
        <Editor
            editorValue={editorValue} 
            setEditorValue={setEditorValue} 
            height='34.7em'
            width='100%'          
            />
      </TabPanel>
      <TabPanel className={classes.tabsPanel} value={value} index={1}>
        <CodeEditor code={code} setCode={setCode} height='29em' />
      </TabPanel>
      <TabPanel className={classes.editorTestCases} value={value} index={2}>
        <EditorTestcases 
          editorValue={editorTestcasesValue} 
          setEditorValue={setEditorTestcasesValue} 
          height='34.7em'
          width='100%'          
          />
      </TabPanel>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '32.08em',
    marginTop: '2em',
    color: 'black',
    padding: 0
  },
  removeCaps: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
  },
  tabsPanel: {
    '& > div': {
      padding: 1
    }
  },
  editor: {
    '& > div': {
      padding: 1
    }
  },
  editorTestCases: {
    '& > div': {
      padding: 1
    }
  }
}));
