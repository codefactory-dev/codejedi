import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ParameterInputDropdown from './ParameterInputDropdown';
import Divider from '@material-ui/core/Divider';
import IconButton from '../Buttons/IconButton';
import useKeyPres from '../../Hooks/useKeyPress';
import ListTextField from '../../components/TextField/ListTextField';


import {ReactComponent as TextIcon} from '../../icons/text.svg';
import {ReactComponent as ListIcon} from '../../icons/list.svg';
import {ReactComponent as AddIcon} from '../../icons/add.svg';
import {ReactComponent as DeleteIcon} from '../../icons/delete.svg';
import {ReactComponent as CrossIcon} from '../../icons/cross.svg';
import {ReactComponent as YesIcon} from '../../icons/yes.svg';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Lato',
        fontWeigth: '700',
        boxSizing: 'border-box',
        margin: '0',
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.greyLight,
        
    },
    col_flex1: {
        display: 'flex',
        alignItems: 'center',
        flexBasis: '30em',
        borderRadius: '5px',
        padding: '5px 0 5px 5px',
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

    // row subtitle
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

    // row content
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
    inputNameDelete: {
        color: theme.palette.secondary.main,
        fontSize: '1rem',
        marginLeft: '35px',
        padding: '0 10px',
        flexGrow: '100'
    },
    inputNameField: {      
        backgroundColor: theme.palette.common.black2,
        color: theme.palette.common.white,
        fontFamily: 'Lato',
        fontSize: '1rem',
        width: '100%',
        border: 0,
        borderBottom: `.1px solid ${theme.palette.common.grey}`,
        cursor: 'pointer',
        fontWeight: '700',
        padding: 0
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

    // extra
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
    addIcon: {
        height: '12px',
        width: '12px'
    },
    newButton: {
        ...theme.listSubtitle,
        marginLeft: '5px',   
    },
  }));

 
// -----------------------------------------
//  GLOBAL VARIABLES
// ----------------------------------------
const ROW_STATES = {
    DEFAULT: 0,
    HOVERING: 1,
    EDITING: 2,
    DELETING: 3
}

const INPUT_TYPES = ['int', 'String'];

export default function ParameterInputList(props) {
    const classes = useStyles();
    const theme = useTheme();
  
    // const [inputs, setInputs] = useState([{name: 'nums1', type: INPUT_TYPES[0]}, 
    //                                       {name: 'nums2', type: INPUT_TYPES[0]}, 
    //                                       {name: 'nums3', type: INPUT_TYPES[1]}]);

    const [inputs, setInputs] = useState(props.inputs);
    const [inputTypeClicked, setInputTypeClicked] = useState(-1);
    const [inputNameHovered, setInputNameHovered] = useState({rowIndex: -1, rowState: ROW_STATES.DEFAULT});
    const [inputNameClicked, setInputNameClicked] = useState(-1);

    // ----------------------------------------------------------------
    // HOOKS
    // ----------------------------------------------------------------
 
    useKeyPres('Escape', () => {
        setInputTypeClicked(-1);
    });


    useEffect(() => {
        props.onParameterInputChange(inputs);
    }, [inputs])

    // ----------------------------------------------------------------
    // LISTENERS
    // ----------------------------------------------------------------

    const onButtonNewClick = (e) => {       
        setInputs([...inputs, {name: '', type: INPUT_TYPES[0]}]);
    }

    const onButtonDeleteClick = (inputIdx) => {       
        setInputNameHovered({rowIndex: inputIdx, rowState: ROW_STATES.DELETING});
    }

    const onButtonConfirmDeleteClick = (idx) => {
        // confirm deletion
        if (inputNameHovered.rowState === ROW_STATES.DELETING) {
            setInputs(inputs.filter((input, idx) => inputNameHovered.rowIndex !== idx));
            setInputNameHovered({rowIndex: -1, rowState: ROW_STATES.DEFAULT});
            return;
        }
    }

    const onInputNameHover = (inputIdx) => {
        if (inputNameHovered.rowIndex === inputIdx) { return; }

        const rowState = inputIdx === -1 ? ROW_STATES.DEFAULT : ROW_STATES.HOVERING;
        setInputNameHovered({rowIndex: inputIdx, rowState});
    }
    const onInputNameClick = (idx) => {
        setInputNameHovered({rowIndex: inputNameHovered.rowIndex, rowState: ROW_STATES.EDITING});
    }

    const onInputNameBlur = (inputIdx, inputValue) => {
        inputs[inputIdx].name = inputValue;
        setInputs([...inputs]);

        setInputNameHovered({rowIndex: inputNameHovered.rowIndex, rowState: ROW_STATES.HOVERING});
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
        console.log(inputType);  
        inputs[inputTypeClicked].type = INPUT_TYPES[inputType];
        setInputs([...inputs]);
        setInputTypeClicked(-1);
    }
    

    // ----------------------------------------------------------------
    // CSS/Component HELPERS
    // ----------------------------------------------------------------

    const icon = (idx, icon, fillColor, callback) => (
            <div style={{"position": "absolute"}}>
                <IconButton 
                    width={20} 
                    height={20} 
                    padding={3} 
                    fill={`${fillColor}`}                     
                    fillHover={'white'}
                    stroke={'none'}
                    strokeHover={'none'}
                    borderRadius={'3px'}
                    icon={icon}
                    onClick={e => { e.stopPropagation(); callback(idx); }}
                />
            </div>
    );
        
    
    const deleteIcon = idx => icon(idx, <CrossIcon />, theme.palette.primary.main, onButtonDeleteClick); 

    const confirmDeleteIcon = idx => icon(idx, <YesIcon />, theme.palette.secondary.main, onButtonConfirmDeleteClick);
                            

    const generateInputNameComponent = (input, idx) => {
        const checkingDelete = inputNameHovered.rowState === ROW_STATES.DELETING;
        const hovered = inputNameHovered.rowIndex === idx;
        let inputNameComponent;

        
        // if not hovering the row component, or if simply hovering
        if (!hovered || inputNameHovered.rowState === ROW_STATES.HOVERING) {
            inputNameComponent =  (
                    <span className={classes.inputName}>
                            {input.name}
                    </span>
        )}
        // if hovering the row component and clicked to remove it
        else if (inputNameHovered.rowState === ROW_STATES.DELETING) {
            inputNameComponent =  (
                <span className={[classes.inputNameDelete]}>
                        Are you sure to delete this row?
                </span>
        )}
        // if hovering the row component and clicked to edit it
        else {
            inputNameComponent =  (
                <span className={classes.inputName}>
                        <input className={classes.inputNameField}
                               autoFocus 
                               type="text"
                               defaultValue={input.name || ''}
                               onKeyUp={(e) => onInputNameKeyUp(idx, e)}
                               onBlur={(e) => onInputNameBlur(idx, e.target.value)}
                        />
                </span>
        )}
        

        return (
            <React.Fragment>
                {hovered 
                 ?
                 checkingDelete ? confirmDeleteIcon(idx)  : deleteIcon(idx)
                 : 
                 undefined}
                {inputNameComponent}
            </React.Fragment>
        );
    };

    const generateInputTypeComponent = (input, idx) => {
        return (
            <React.Fragment>
            {
                inputTypeClicked === idx
                ?
                <ParameterInputDropdown options={INPUT_TYPES} onClick={onTypeInputSelected} />
                :
                <a className={classes.inputTypeTag}>{input.type}</a>
            }
            </React.Fragment>
        );
    };

    const getInputTypeContainerClassName = (input, idx) => {
        if (inputTypeClicked === idx) {
            return `${classes.contentTypeContainer}`;
        }

        return `${classes.contentTypeContainer} ${classes.contentTypeContainerHover}`;
    };

    return (
        <div className={classes.root}>
            {/* title row */}
            {/* <div className={classes.titleContainer}>
                <span className={classes.title}>Parameters</span>
            </div> */}
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
                {inputs && inputs.map((input, idx) => {
                    return (
                        <React.Fragment key={`input-${idx}`}>

                            {/* content row(s) */}
                            <div className={classes.contentInput}>                                                            
                                <div className={classes.col_flex1} 
                                     onMouseEnter={() => onInputNameHover(idx)} 
                                     onMouseLeave={() => onInputNameHover(-1)}
                                     onClick={()=> onInputNameClick(idx)}>
                                     { generateInputNameComponent(input, idx) }
                                   
                                </div>
                                <div className={getInputTypeContainerClassName(input, idx)} 
                                     onClick={() => onInputTypeClick(idx)}>
                                     { generateInputTypeComponent(input, idx) }
                                </div>                       
                            </div>
                            <hr className={classes.divider} />
                        </React.Fragment>
                )})}
                
                <div className={classes.addContainer}
                     onClick={onButtonNewClick} >
                    <AddIcon className={classes.addIcon} />
                    <a className={classes.newButton}>New</a>
                </div>
            </div>
            <hr className={classes.divider} />        
        </div>
    );
}

ParameterInputList.propTypes = {
    inputs: PropTypes.array,
    onParameterInputChange: PropTypes.func.isRequired
}

ParameterInputList.defaultProps = {
    inputs: []
}