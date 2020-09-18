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
import { ParseString } from '../../utils/Parser'
import CodeScaffolding from '../../utils/CodeScaffolding'
import { ConvertCodeToOneLiner } from '../../utils/TextReadingUtils'
import axios from 'axios'

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
  const [code, setCode] = useState("function solution(S){ \n    const n = S.length;\n    for(let i=0;i<n;i+=1)\n    { \n        if (S[i] < S[i-1])\n        {         \n            return S.substring(0,i-1) + S.substring(i);       \n        }\n    } \n    return S.substring(0,n-1); \n}");
  const [editorValue, setEditorValue] = useState(`\nWrite a function solution that, given a string S consisting of N\ncharacters, returns the alphabetically smallest string that can be obtained by removing exactly one letter from S.\n\nExamples:\n\n1. Given S="acb", by removing one letter, you can obtain "ac", "ab" or\n"cb". Your function should return "ab" (after removing 'c') since it is\nalphabetically smaller than "ac" and "bc".\n\n2. Given S = "hot", your function should return "ho", which is alphabetically smaller than "ht" and "ot".\n\n3. Given S = "codility", your function should return "cdility", which can be obtained by removing the second letter.\n\n4. Given S = "aaaa", your function should return "aaa". Any occurrence of\n'a' can be removed.\n\nWrite an efficient algorithm for the following assumptions:\n\n    * N is an integer within the range [2..100,000];\n\n    * string S consists only of lowercase letters (a-z).`);
  const [editorTestcasesValue, setEditorTestcasesValue] = useState('');


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
      var hiddenSolution = "function solution(S){ const n = S.length; for(let i=0;i<n;i+=1) { if (S[i] < S[i-1]){ return S.substring(0,i-1) + S.substring(i); } } return S.substring(0,n-1); }";
            
      //get test cases from file  
      var testCasesText = editorTestcasesValue;
  
      //parse test cases into javascript
      var structure = ParseString(testCasesText);
      console.log("---PARSED STRUCTURE---");
      console.log(structure);
  
      //insert test cases into question
      var togetherText = questionText;
      togetherText+=CodeScaffolding(structure, code, hiddenSolution);
  
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
                  code:oneLiner
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
