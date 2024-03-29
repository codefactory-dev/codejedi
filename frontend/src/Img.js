import React, { useState } from 'react';
import api from 'services/api';

function Img() {
	const [img, setImg] = useState('');
	let imgFile;
	let fileReader;

	const uploadImage = (e) => {
		const content = fileReader.result;
		// console.log(content)

		const uploadImage = async () => {
			// POST request
			const netlifyURL = '/.netlify/functions/server/api/uploadPhoto';
			const localURL = 'http://localhost:3000/uploadPhoto';
			const postURL = localURL;
			const result = await api.post(postURL, { img: content });

			// console.log(result);
			setImg(result.data.buffer);
		};

		uploadImage();
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		fileReader = new FileReader();
		fileReader.onloadend = uploadImage;
		fileReader.readAsDataURL(imgFile);
	};

	// --------------------------------------------------------------------
	// RENDERING
	// --------------------------------------------------------------------

	return (
		<>
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<input
					type="file"
					name="avatar"
					onChange={(e) => (imgFile = e.target.files[0])}
				/>
				<input type="submit" value="Upload a file" />
			</form>
			{img ? <img src={img} width="400" height="300" /> : undefined}
		</>
	);
}

export default Img;
