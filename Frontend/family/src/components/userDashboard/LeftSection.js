import abhishek from "./abhishek.jpg";
import "./LeftSection.css";
import { Link } from "react-router-dom";
import UserProfile from "../ProfilePage/profile";
const LeftSection = () => {
	return (
		<div className="LeftSection">
			<div className="ProfileBox">
				{" "}
				<Link to="../UserProfile/id">
					<img className="smallImg" src={abhishek} />
				</Link>
				<p className="MyName">Abhishek Dahal</p>
			</div>
		</div>
	);
};

export default LeftSection;
