import React from "react";
import defaultImage from "../images/default.png";
const RightSection = () => {
	return (
		<div className="w-[30vw] h-[80vh] overflow-y-scroll relative left-[40vw] bg-green-400 ">
			<div className="pl-[2vw] w-full  relative bottom-5">
				<h2 className="pt-7 text-3xl mb-5">contacts</h2>
				<div className="flex h-11 items-center ease-in cursor-pointer hover:bg-slate-300 gap-3  pl-8 rounded">
					<img
						src={defaultImage}
						className="rounded-full h-8 w-8"
						alt="image"
					></img>
					<span className="text-xl  ">My name</span>
				</div>
				<div className="flex h-11 items-center ease-in hover:bg-slate-300 gap-3  cursor-pointer   pl-8 rounded">
					<img
						src={defaultImage}
						className="rounded-full h-8 w-8"
						alt="image"
					></img>
					<span className="text-xl  ">My name</span>
				</div>
				<div className="flex h-11 items-center ease-in hover:bg-slate-300 gap-3  cursor-pointer   pl-8 rounded">
					<img
						src={defaultImage}
						className="rounded-full h-8 w-8"
						alt="image"
					></img>
					<span className="text-xl  ">My name</span>
				</div>
				<div className="flex h-11 items-center ease-in hover:bg-slate-300 gap-3  cursor-pointer   pl-8 rounded">
					<img
						src={defaultImage}
						className="rounded-full h-8 w-8"
						alt="image"
					></img>
					<span className="text-xl  ">My name</span>
				</div>
				<div className="flex h-11 items-center ease-in hover:bg-slate-300 gap-3  cursor-pointer   pl-8 rounded">
					<img
						src={defaultImage}
						className="rounded-full h-8 w-8"
						alt="image"
					></img>
					<span className="text-xl  ">My name</span>
				</div>
				<div className="flex h-11 items-center ease-in hover:bg-slate-300 gap-3  cursor-pointer   pl-8 rounded">
					<img
						src={defaultImage}
						className="rounded-full h-8 w-8"
						alt="image"
					></img>
					<span className="text-xl  ">My name</span>
				</div>
			</div>
		</div>
	);
};

export default RightSection;
