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
  const [editorValue, setEditorValue] = useState(`\nGiven a positive integer n and you can do operations as follow:\n\n	1. If n is even, replace n with n/2.\n	2. If n is odd, you can replace n with either n + 1 or n - 1.\n	\nWhat is the minimum number of replacements needed for n to become 1?\n\nExample 1:\n\n	Input:\n	8\n\n	Output:\n	3\n\n	Explanation:\n	8 -> 4 -> 2 -> 1\n	\nExample 2:\n\n	Input:\n	7\n\n	Output:\n	4\n\n	Explanation:\n	7 -> 8 -> 4 -> 2 -> 1\n	or\n	7 -> 6 -> 3 -> 2 -> 1\n`);
  const [code, setCode] = useState("function integerReplacement(n) {\n    var min = Number.POSITIVE_INFINITY;\n    var stack = [{ num: n, step: 0 }];\n    var set = new Set();\n    var nextStep;\n    var item;\n    \n    while (stack.length) {\n        item = stack.shift();\n        \n        if (item.num === 1) {\n            if (min > item.step) {\n                min = item.step;\n            }\n            continue;\n        }\n        \n        if (set.has(item.num) || item.step >= min) {\n            continue;\n        }\n        set.add(item.num);\n        \n        nextStep = item.step + 1;\n        if (item.num % 2 === 0) {\n            item.num /= 2;\n            stack.push({ num: item.num, step: nextStep });\n        } else {\n            stack.push({ num: item.num - 1, step: nextStep });\n            stack.push({ num: item.num + 1, step: nextStep });\n        }\n    }\n    \n    return min;\n};");
  const [editorTestcasesValue, setEditorTestcasesValue] = useState('8\n7');
  const [questionType,setQuestionType] = useState(questionTypes.Integer);
  


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
      var hiddenSolution = "function integerReplacement(n) {\n    var min = Number.POSITIVE_INFINITY;\n    var stack = [{ num: n, step: 0 }];\n    var set = new Set();\n    var nextStep;\n    var item;\n    \n    while (stack.length) {\n        item = stack.shift();\n        \n        if (item.num === 1) {\n            if (min > item.step) {\n                min = item.step;\n            }\n            continue;\n        }\n        \n        if (set.has(item.num) || item.step >= min) {\n            continue;\n        }\n        set.add(item.num);\n        \n        nextStep = item.step + 1;\n        if (item.num % 2 === 0) {\n            item.num /= 2;\n            stack.push({ num: item.num, step: nextStep });\n        } else {\n            stack.push({ num: item.num - 1, step: nextStep });\n            stack.push({ num: item.num + 1, step: nextStep });\n        }\n    }\n    \n    return min;\n};";
            
      //get test cases from file  
      var testCasesText = editorTestcasesValue;
  
      //parse test cases into javascript
      var structure = Parse(testCasesText, questionType);
      console.log("---PARSED STRUCTURE---");
      console.log(structure);
  
      //insert test cases into question
      var togetherText = questionText;
      togetherText+=CodeScaffolding(structure, code, hiddenSolution, questionType);
  
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
