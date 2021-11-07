import React, { useState, useEffect } from 'react';
import RatingCss from './Rating.scss';

export default function Rating() {
	const [ratings, setRatings] = useState([
		{
			rating: 3,
		},
		{
			rating: 4,
		},
		{
			rating: 2.5,
		},
	]);
	useEffect(() => {}, []);
	return (
		<div className="main">
			{(
				ratings.reduce((acc, val) => acc + val.rating, 0) / ratings.length
			).toFixed(2)}
			<div>
				<svg className="rectangle-wrapper">
					<rect className="rectangle" />
					Sorry, your browser does not support inline SVG.
				</svg>
				<svg className="rectangle-wrapper">
					<rect className="rectangle" />
					Sorry, your browser does not support inline SVG.
				</svg>
				<svg className="rectangle-wrapper">
					<rect className="rectangle" />
					Sorry, your browser does not support inline SVG.
				</svg>
				<svg className="rectangle-wrapper">
					<rect className="rectangle" />
					Sorry, your browser does not support inline SVG.
				</svg>
				<svg className="rectangle-wrapper">
					<rect className="rectangle" />
					Sorry, your browser does not support inline SVG.
				</svg>
				<span className="amount-ratings">{`  (${ratings.length})`}</span>
			</div>
		</div>
	);
}
