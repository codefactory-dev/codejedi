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
  const [editorValue, setEditorValue] = useState(``);
  const [code, setCode] = useState("function solution(N) { \n    for (let i = 1; i< N; i+=1){\n        process.stdout.write('L\\n'); \n    }\n\n    process.stdout.write('L'.repeat(N) + '\\n')\n\n}");
  const [editorTestcasesValue, setEditorTestcasesValue] = useState('5\n4\n12');
  const [questionType,setQuestionType] = useState(questionTypes.Array);
  


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
      var hiddenSolution = "function solution(A){ \n    let answer = -9; \n    A.forEach(x => { \n        if(x/10 < 1){ \n            answer = answer > x ? answer : x; \n        } \n    }) \n    return answer; \n}";
            
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
