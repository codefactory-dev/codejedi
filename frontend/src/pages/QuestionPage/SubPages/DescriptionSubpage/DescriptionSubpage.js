import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import CustomSelect from '../../../../components/Select/CustomSelect.js'
import SimpleTextField from '../../../../components/TextField/SimpleTextField.js'
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import RichTextEditor from '../../../../components/Editor/RichTextEditor.js'

import RegularButton from '../../../../components/Buttons/RegularButton.js'

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
  const [value, setValue] = React.useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(editorState){
    setEditorState(editorState);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.verticalContainer}>
      <div className={classes.titleContainer}>
          <div className={classes.title}>
              <SimpleTextField className={classes.titleTextfield} label="Title" />
              <div className={classes.grow}></div>
              <div className={classes.colFlex1}>
                <CustomSelect options={['Easy', 'Medium', 'Hard']} checkedOptionIndex = {2} label="Difficulty" />
              </div>
              <div className={classes.grow2}></div>
              <div className={classes.colFlex1}>
                <CustomSelect options={['Binary Tree', 'Greedy', 'Linked List']} label="Type" />
              </div>
              {/*<CustomSelect label="Type" />*/}
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
          />
        </Paper>
      </div>
      
    </div>
  );
}



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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


