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
  const [editorValue, setEditorValue] = useState(`Given an initial array arr, every day you produce a new array using the array of the previous day.\n\nOn the i-th day, you do the following operations on the array of day i-1 to produce the array of day i:\n\nIf an element is smaller than both its left neighbor and its right neighbor, then this element is incremented.\nIf an element is bigger than both its left neighbor and its right neighbor, then this element is decremented.\nThe first and last elements never change.\nAfter some days, the array does not change. Return that final array.\n\n \n\nExample 1:\n\nInput: arr = [6,2,3,4]\nOutput: [6,3,3,4]\nExplanation: \nOn the first day, the array is changed from [6,2,3,4] to [6,3,3,4].\nNo more operations can be done to this array.\nExample 2:\n\nInput: arr = [1,6,3,4,3,5]\nOutput: [1,4,4,4,4,5]\nExplanation: \nOn the first day, the array is changed from [1,6,3,4,3,5] to [1,5,4,3,4,5].\nOn the second day, the array is changed from [1,5,4,3,4,5] to [1,4,4,4,4,5].\nNo more operations can be done to this array.\n \n\nConstraints:\n\n3 <= arr.length <= 100\n1 <= arr[i] <= 100`);
  const [code, setCode] = useState("class Solution {\n    public List<Integer> transformArray(int[] arr) {\n        \n    }\n}");
  const [editorTestcasesValue, setEditorTestcasesValue] = useState('[6,2,3,4]\n[1,6,3,4,3,5]');
  const [questionType,setQuestionType] = useState(questionTypes.Array);
  const [languageType, setLanguageType] = useState(languageTypes.Java)
  

  useEffect(()=>{
    console.log("question description updated to "+props.questionDescription);
    setEditorValue(props.questionDescription);
  },[props.questionDescription])

  useEffect(()=>{
    if (props.shouldSave)
    {
      console.log("calling saveAll");
      saveAll();
      props.setShouldSave(false);
    }
  },[props.shouldSave])

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

  function saveAll()
  {
      //get question from somewhere
      var questionText = code;

      //get solution from database
      var hiddenSolution = `class HiddenSolution {\n    public List<Integer> transformArray(int[] arr) {\n        while (true) {\n            int[] tmp = new int[arr.length];\n            boolean change = false;\n            tmp[0] = arr[0];\n            tmp[arr.length - 1] = arr[arr.length - 1];\n            for (int i = 1; i < arr.length - 1; i++) {\n                if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {\n                    tmp[i] = arr[i] - 1;\n                    change = true;\n                } else if (arr[i] < arr[i - 1] && arr[i] < arr[i + 1]) {\n                    tmp[i] = arr[i] + 1;\n                    change = true;\n                } else {\n                    tmp[i] = arr[i];\n                }\n            }\n            arr = tmp;\n            if (!change) break;\n        }\n        List<Integer> res = new ArrayList<>();\n        for (int num : arr) res.add(num);\n        return res;\n    }\n}`;
            
      //get test cases from file  
      var testCasesText = editorTestcasesValue;
  
      //parse test cases into javascript
      var structure = Parse(testCasesText, questionType);
      console.log("---PARSED STRUCTURE---");
      console.log(structure);
  
      //insert test cases into question
      //var togetherText = questionText;
      const togetherText=CodeScaffolding(structure, code, hiddenSolution, questionType,languageType,"transformArray");

  
      console.log("---TOGETHER TEXT---");
      console.log(togetherText);
  
      //transform question into a "sendable" one-line string for json
      var oneLiner = ConvertCodeToOneLiner(togetherText);
      console.log("---ONE LINER---");
      console.log(oneLiner);
  
  
      saveQuestion();
  
      // POST both the question and the test cases
      async function saveQuestion() {
        try{
          
          const allUsers = await axios({
            method: 'get',
            url: `/users`
          });  
          //console.log("got all users ! "+JSON.stringify(allUsers.data));
          const userId = allUsers.data[0]._id;
          const result = await axios({
              method: 'post',
              url: `/users/${userId}/questions`,
              data: { 
                title: 'TestTest',
                difficulty: 'Easy',
                type: 'Array',
                description: 'TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest.'
              }
          });  
          console.log("posted ! data: "+JSON.stringify(result.data));          
        } catch(e) {
          console.log(e.message+": "+(e.response.data.message)+". errors list: "+JSON.stringify(e.response.data.errors));
        }
      }    
  }

  function submitAll()
  {
      
      //get question from somewhere
      var questionText = code;

      //get solution from database
      var hiddenSolution = `class HiddenSolution {\n    public List<Integer> transformArray(int[] arr) {\n        while (true) {\n            int[] tmp = new int[arr.length];\n            boolean change = false;\n            tmp[0] = arr[0];\n            tmp[arr.length - 1] = arr[arr.length - 1];\n            for (int i = 1; i < arr.length - 1; i++) {\n                if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {\n                    tmp[i] = arr[i] - 1;\n                    change = true;\n                } else if (arr[i] < arr[i - 1] && arr[i] < arr[i + 1]) {\n                    tmp[i] = arr[i] + 1;\n                    change = true;\n                } else {\n                    tmp[i] = arr[i];\n                }\n            }\n            arr = tmp;\n            if (!change) break;\n        }\n        List<Integer> res = new ArrayList<>();\n        for (int num : arr) res.add(num);\n        return res;\n    }\n}`;
            
      //get test cases from file  
      var testCasesText = editorTestcasesValue;
  
      //parse test cases into javascript
      var structure = Parse(testCasesText, questionType);
      console.log("---PARSED STRUCTURE---");
      console.log(structure);
  
      //insert test cases into question
      //var togetherText = questionText;
      const togetherText=CodeScaffolding(structure, code, hiddenSolution, questionType,languageType,"transformArray");

  
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
        <CodeEditor code={code} setCode={setCode} height='29rem' />
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
