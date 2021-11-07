import React, { useState, useEffect } from 'react';
import RatingCss from './Rating.scss';

export default function Rating() {
	const [ratingScore, setRatingScore] = useState(0);
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
	useEffect(() => {
		const score = (
			ratings.reduce((acc, val) => acc + val.rating, 0) / ratings.length
		).toFixed(2);
		setRatingScore(score);
	}, []);
	return (
		<div className="main">
			{ratingScore}
			<div>
				{Array.from({ length: 5 }).map((val, idx) => {
					if (idx < Math.floor(ratingScore)) {
						return (
							<svg className="rectangle-wrapper">
								<rect className="rectangle" />
							</svg>
						);
					}
					return (
						<svg className="rectangle-wrapper">
							<rect className="rectangle-disabled" />
						</svg>
					);
				})}
				<span className="amount-ratings">{`  (${ratings.length})`}</span>
			</div>
		</div>
	);
}
