import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import CustomSelect from '../../../../components/Select/CustomSelect.js'
import SimpleTextField from '../../../../components/TextField/SimpleTextField.js'
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Button from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState } from 'draft-js';
import PropTypes from 'prop-types';
import {
  convertToRaw,
} from 'draft-js';


import RichTextEditor from '../../../../components/Editor/RichTextEditor.js'

import RegularButton from '../../../../components/Buttons/RegularButton.js'

// -------------------------------------------------------------------------
// GLOBAL VARIABLES and HELPERS
// -------------------------------------------------------------------------

const DIFFICULTY_TYPES = {
  EASY: 'Easy', 
  MEDIUM: 'Medium',
  HARD: 'Hard'
};
const QUESTION_TYPES = {
  ARRAY: 'Array', 
  TREE: 'Tree',
  STRING: 'String'
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

const getKeyIndexByValue = (object, value) => {
  const keys = Object.keys(object);
  return keys.indexOf(getKeyByValue(object, value));
}

const useStyles = makeStyles( theme => ({
   

  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: 893.750,
    alignItems: 'center'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '60%',
    marginTop: 20,
    height: 60,
    minWidth: 503,
    paddingLeft: 0,
    paddingRIght: 0
  },
  questionPageSeparator: {
    width: '20%',
    minWidth: 30,
    height: 20
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '51px'
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  tabs: {
    width: '11%',
    minWidth: 140,
    backgroundColor: theme.palette.common.black
  },
  scroller: {},
  textArea: {
    flexShrink: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
    height: 700,
    width: '60%',
    marginTop: 60,
    minWidth: 545
  }, 
  separator: {
    position: 'relative',
    minWidth: 20,
    width: '9%'
  },
  secondSeparator: {
    width: '9%'
  },
  thirdElement: {
    flexGrow: 1,
    width: '11%',
    minWidth: 140,
  },
  regularButton: {
    width: '60%',
  },
  separatorRegButton: {
    width: '20%'
  },
  grow: {
    minWidth: 20,
    flexGrow: 2
  },
  grow2: {
    minWidth: 20,
    flexGrow: 1
  },
  titleTextfield: {
    flexShrink: 1
  },
  colFlex1: {
    display: "flex", 
    flexDirection: "column", 
    flexGrow: 1
  }
}));

export default function DescriptionSubpage(props) {
  const classes = useStyles();
  const [questionName, setQuestionName] = useState(props.questionName);
  const [questionDifficulty, setQuestionDifficulty] = useState(props.questionDifficulty);
  const [questionType, setQuestionType] = useState(props.questionType);
  const [editorState, setEditorState] = useState(props.editorState);


  // --------------------------------------------
  // HOOKS
  // --------------------------------------------
  useEffect(() => {
    // load props
    if (props.title && props.title !== questionName){
      setQuestionName(props.title);
    }
    if (props.questionDifficulty && props.questionDifficulty !== questionDifficulty){
      setQuestionDifficulty(props.questionDifficulty);
    }
    if (props.questionType && props.questionType !== questionType){
      setQuestionType(props.questionType);
    }
    const blocks = convertToRaw(props.editorState.getCurrentContent()).blocks;
    const editorStateRaw = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

    const localBlocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const localEditorStateRaw = localBlocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    if (props.editorState && editorStateRaw.replace(/\s/g, '').length >0 && editorStateRaw !== localEditorStateRaw){
      setEditorState(EditorState.createWithContent(ContentState.createFromText(editorStateRaw)));  
      
    }  

    
  },[
    props.title,
    props.questionDifficulty,
    props.questionType,
    props.editorState
  ]);

  useEffect(() => {
      props.onPageChange({questionName, questionDifficulty, questionType, editorState});
  },[questionName, 
     questionDifficulty,
     questionType,
     editorState]);

  // --------------------------------------------
  // CALLBACKS
  // --------------------------------------------
  const onQuestionNameChange = evt => setQuestionName(evt.target.value);
  const onQuestionTypeChange = evt => setQuestionType(QUESTION_TYPES[evt.target.value]);
  const onQuestionDifficultyChange = evt => setQuestionDifficulty(DIFFICULTY_TYPES[evt.target.value]);
  const onEditorStateChange = editorState => setEditorState(editorState);

  return (
    <div className={classes.verticalContainer}>
      <div className={classes.titleContainer}>
          <div className={classes.title}>
              <SimpleTextField className={classes.titleTextfield} 
                               label="Title"
                               value={questionName}
                               setQuestionName={setQuestionName}
                               onChange={onQuestionNameChange}/>
              <div className={classes.grow}></div>
              <div className={classes.colFlex1}>
                <CustomSelect label="Difficulty" 
                              options={(() => Object.keys(DIFFICULTY_TYPES))()} 
                              checkedOptionIndex={(() => 1+getKeyIndexByValue(DIFFICULTY_TYPES, questionDifficulty))()}
                              onChange={onQuestionDifficultyChange}
                              />
              </div>
              <div className={classes.grow2}></div>
              <div className={classes.colFlex1}>
                <CustomSelect label="Type"
                              options={(() => Object.keys(QUESTION_TYPES))()}
                              checkedOptionIndex={(() => 1+getKeyIndexByValue(QUESTION_TYPES, questionType))()}
                              onChange={onQuestionTypeChange}
                              />
              </div>
          </div>
      </div>
      <div className={classes.bodyContainer}>
        <Paper className={classes.textArea}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list'],
              // inline: { inDropdown: true },
              // list: { inDropdown: true },
              // textAlign: { inDropdown: true },
              // link: { inDropdown: true },
              // history: { inDropdown: true },
            }}
          />
        </Paper>
      </div>
      
    </div>
  );
}

DescriptionSubpage.propTypes = {
    questionName: PropTypes.string,
    questionDifficulty: PropTypes.oneOf(Object.values(DIFFICULTY_TYPES)),
    questionType: PropTypes.oneOf(Object.values(QUESTION_TYPES)),
    editorState: PropTypes.object,
    // callbacks
    onPageChange: PropTypes.func.isRequired,
}

DescriptionSubpage.defaultProps = {
  questionName: '',
  questionDifficulty: DIFFICULTY_TYPES.EASY,
  questionType: QUESTION_TYPES.ARRAY,
  editorState: EditorState.createEmpty()
}