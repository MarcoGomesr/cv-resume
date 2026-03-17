import { Link } from "react-router";

export default function Navbar() {
	return (
		<nav className="navbar">
			<Link
				to="/"
				className=" text-gradient leading-tight tracking-[-2px] font-semibold"
			>
				<span className="text-[#606beb] font-bold text-2xl">CV</span>
				<span className="font-bold text-2xl">RESUME</span>
			</Link>
			<Link className="primary-button w-fit" to="/upload">
				Upload CV
			</Link>
		</nav>
	);
}
