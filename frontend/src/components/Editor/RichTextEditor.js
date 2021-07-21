import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './RichTextEditor.scss';
import { camelCase } from 'jquery';

// source: https://codesandbox.io/s/qzj7k4w2mw?file=/src/App.js:212-225
// more examples: https://codesandbox.io/examples/package/draft-js

const useStyles = makeStyles((theme) => ({
	editorContainer: {
		height: 'calc(100% - 20px)',
	},
	editors: {
		border: '1px blue solid',
		fontFamily: 'Open Sans',
		fontSize: '90%',
		height: '100%',
	},
	button: {
		height: '20px',
		width: '20px',
		padding: '2px',
		margin: 0,
	},
}));
function RichTextEditor() {
	const classes = useStyles();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const onChange = (editorState) => {
		setEditorState(editorState);
	};

	const handleKeyCommand = (command) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	const onUnderlineClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
	};

	const onBoldClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
	};

	const onItalicClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
	};

	return (
		<div className={classes.editorContainer}>
			<button className={classes.button} onClick={onUnderlineClick}>
				U
			</button>
			<button className={classes.button} onClick={onBoldClick}>
				<b>B</b>
			</button>
			<button className={classes.button} onClick={onItalicClick}>
				<em>I</em>
			</button>
			<div className={classes.editors}>
				<Editor
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}

export default RichTextEditor;
