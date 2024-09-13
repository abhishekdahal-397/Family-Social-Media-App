import React from "react";
import "../css/stories.css";
import abhishek from "../images/abhishek.jpg";
import def from "../images/default.png";

const Stories = () => {
	const cards = [
		{ title: "Card 1", content: "Content of Card 1" },
		{ title: "Card 2", content: "Content of Card 2" },
		{ title: "Card 3", content: "Content of Card 3" },
		{ title: "Card 4", content: "Content of Card 4" },
		{ title: "Card 5", content: "Content of Card 5" },
		{ title: "Card 6", content: "Content of Card 6" },
		{ title: "Card 7", content: "Content of Card 7" },
	];

	return (
		<div className="h-[15vw]">
			<div className="text">Stories</div>
			<div className="cards">
				{cards.map((card, index) => (
					<div key={index} className="card ">
						<img src={def}></img>
						<h2 className="text-xl font-semibold"></h2>
						<p className="mt-2 text-gray-700"></p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Stories;
