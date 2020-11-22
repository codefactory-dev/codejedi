import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ParameterInputDropdown from './ParameterInputDropdown';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '../Buttons/IconButton';
import useKeyPres from '../../Hooks/useKeyPress';
import ListTextField from '../../components/TextField/ListTextField';
import {ReactComponent as TextIcon} from '../../icons/text.svg';
import {ReactComponent as ListIcon} from '../../icons/list.svg';
import {ReactComponent as AddIcon} from '../../icons/add.svg';
import {ReactComponent as DeleteIcon} from '../../icons/delete.svg';
import {ReactComponent as CrossIcon} from '../../icons/cross.svg';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Lato',
        fontWeigth: '700',
        height: '100vh',
        boxSizing: 'border-box',
        padding: '30px 10px',
        margin: '0',
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.greyLight,
        
    },
    col_flex1: {
        display: 'flex',
        alignItems: 'center',
        flexBasis: '30em',
        borderRadius: '5px',
        paddingLeft: '5px',
        [theme.breakpoints.down('xs')]: {
            flexBasis: '50%'          
        },
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.common.black2,
        }
    },
    col_flex2: {
        display: 'flex',
    },

    // title
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0'
    },
    title: {
        marginRight: '15px',
        fontSize: '1.4rem',
    },

    // subtitle
    subtitleContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '5px',
        padding: '10px',
        fill: theme.palette.common.grey3,
        
    },
    subtitle: {
        ... theme.listSubtitle,
        display: 'inline',
        marginLeft: '5px',
        
    },
    subtitleIcon: {
        height: '15px', 
        width: '15px'
    },

    // content
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    contentInput: {
        display: 'flex',
        alignItems: 'center',
        margin: '5px 0'
    },
    inputName: {
        color: theme.palette.common.white,
        fontSize: '1rem',
        marginLeft: '35px',
        padding: '0 10px',
        flexGrow: '100'
    },
    contentTypeContainer: { 
        position: 'relative',
        flexGrow: '100',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '5px',
        margin: '2px 0',  
        marginLeft: '30px',
        padding: '0px 5px',      
    },
    contentTypeContainerHover: {
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.common.black2,
        }
    },
    inputTypeTag: {
        alignSelf: 'flex-start',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '10%',
        padding: '5px',
        
        fontSize: '.7rem',
        fontFamily: 'Lato',
        fontWeight: '400',
        color: theme.palette.primary.main,
    },


    divider: {
        ...theme.divider
    },
    addContainer: {
        display: 'inline-flex',
        alignItems: 'center', 
        marginLeft: '25px',
        fill: theme.palette.common.grey3,
        padding: '5px',
        borderRadius: '5px',
        margin: '5px 0',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.common.black2,
        },
    },
    newButton: {
        ...theme.listSubtitle,
        marginLeft: '5px',   
    },
    saveButton: {
        alignSelf: 'flex-start',
        ... theme.btnPrimaryOutline,
        margin: '40px 0',
    }
  }));

 

export default function ParameterInputList() {
    const classes = useStyles();
    const theme = useTheme();

    const types = ['int', 'string', 'array', 'undefined'];
    const [inputs, setInputs] = useState([{name: 'nums1', type: 0}, 
                                          {name: 'nums2', type: 0}, 
                                          {name: 'nums3', type: 1}]);

    const [inputTypeClicked, setInputTypeClicked] = useState(-1);
    const [inputNameHovered, setInputNameHovered] = useState(-1);
    const [inputNameClicked, setInputNameClicked] = useState(-1);

    // ----------------------------------------------------------------
    // HOOKS
    // ----------------------------------------------------------------
 
    useKeyPres('Escape', () => {
        setInputTypeClicked(-1);
    });


    // ----------------------------------------------------------------
    // LISTENERS
    // ----------------------------------------------------------------

    const onButtonNewClick = (e) => {       
        setInputs([...inputs, {name: 'undefined', type: 3}]);
    }

    const onButtonDeleteClick = (inputIdx) => {
        setInputs(inputs.filter((input, idx) => inputIdx !== idx));
    }

    const onInputNameHover = (inputIdx) => {
        if (inputNameHovered === inputIdx) { return; }
        setInputNameHovered(inputIdx);
    }
    const onInputNameBlur = (inputIdx, inputValue) => {
        inputs[inputIdx].name = inputValue;
        setInputs([...inputs]);
        console.log(inputs);
    }
    const onInputNameKeyUp = (inputIdx, evt) => {
        if (evt.key !== 'Enter') { return; }         
        evt.target.blur();
    }

    const onInputTypeClick = (inputIdx) => {
        if (inputTypeClicked === inputIdx) { return; }
        setInputTypeClicked(inputIdx);
    }
    const onTypeInputSelected = (inputType) => {   
        inputs[inputTypeClicked].type = inputType;
        setInputs(inputs);
        setInputTypeClicked(-1);
    }
    

    // ----------------------------------------------------------------
    // CSS HELPERS
    // ----------------------------------------------------------------

    const deleteIcon = idx => (
                    <div style={{"position": "absolute"}}>
                        <IconButton 
                            className={classes.deleteIcon} 
                            width={20} 
                            height={20} 
                            padding={3} 
                            fill={`${theme.palette.primary.main}`}
                            stroke={'none'}
                            fillHover={'white'}
                            strokeHover={'none'}
                            borderRadius={'3px'}
                            icon={<CrossIcon />}
                            onClick={() => onButtonDeleteClick(idx)}
                        />
                    </div>);


    const inputTypeContainerClassName = (idx) => {
        if (inputTypeClicked === idx) {
            return classes.contentTypeContainer;
        }

        return `${classes.contentTypeContainer} ${classes.contentTypeContainerHover}`;
    };

    return (
        <div className={classes.root}>
            {/* title row */}
            <div className={classes.titleContainer}>
                <span className={classes.title}>Parameters</span>
            </div>
            <hr className={classes.divider} />

            {/* subtitle row */}
            <div className={classes.subtitleContainer}>
                <div className={classes.col_flex1}>
                    <TextIcon className={classes.subtitleIcon} />
                    <p className={classes.subtitle}>Name</p>
                </div>
                <div className={classes.col_flex2}>
                    <ListIcon className={classes.subtitleIcon} />
                    <p className={classes.subtitle}>Type</p>
                </div> 
            </div>
            <hr className={classes.divider} />

            {/* container content row(s) */}
            <div className={classes.contentContainer}>
                {inputs.map((input, idx) => {
                    return (
                        <React.Fragment key={`input-${idx}`}>

                            {/* content row(s) */}
                            <div className={classes.contentInput}>                                                            
                                <div className={classes.col_flex1} 
                                     onMouseEnter={() => onInputNameHover(idx)} 
                                     onMouseLeave={() => onInputNameHover(-1)}>
                                    { inputNameHovered === idx 
                                        ?  
                                        deleteIcon(idx)
                                        : 
                                        undefined 
                                    }
                                    <span className={classes.inputName}>
                                        <ListTextField defaultValue={input.name}
                                                       onKeyUp={(e) => onInputNameKeyUp(idx, e)}
                                                       onBlur={(e) => onInputNameBlur(idx, e.target.value)}
                                        />
                                    </span>
                                </div>
                                <div className={inputTypeContainerClassName(idx)} 
                                     onClick={() => onInputTypeClick(idx)}>
                                    {
                                        inputTypeClicked === idx
                                        ?
                                        <ParameterInputDropdown  onClick={onTypeInputSelected} />
                                        :
                                        <a className={classes.inputTypeTag}>{types[input.type]}</a>
                                    }
                                </div>                       
                            </div>
                            <hr className={classes.divider} />
                        </React.Fragment>
                )})}
                
                <div className={classes.addContainer}
                     onClick={onButtonNewClick} >
                    <AddIcon style={{'height': '12px', width: '12px'}} />
                    <a className={classes.newButton}>New</a>
                </div>
            </div>
            <hr className={classes.divider} />
            <Button variant="outlined" disableFocusRipple disableRipple className={classes.saveButton}>Save</Button>
        </div>
    );
}