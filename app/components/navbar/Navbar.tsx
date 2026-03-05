import { Link } from "react-router";

export default function Navbar() {
	return (
		<nav className="navbar">
			<Link to="/" className="logo">
				RESUMIND
			</Link>
			<Link className="primary-button w-fit" to="/upload">
				Upload Resume
			</Link>
		</nav>
	);
}
