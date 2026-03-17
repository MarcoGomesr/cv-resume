import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "@/lib/puter.ts";

export const meta = () => {
	return [
		{ title: "CV Resume - Login" },
		{ name: "description", content: "Log into your account to manage your resumes" },
		{ property: "og:title", content: "CV Resume - Login" },
		{ property: "og:description", content: "Log into your account to manage your resumes" },
		{ property: "og:image", content: "/images/social-meta.webp" },
		{ property: "og:url", content: "/auth" },
		{ property: "og:type", content: "website" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: "CV Resume - Login" },
		{ name: "twitter:description", content: "Log into your account to manage your resumes" },
		{ name: "twitter:image", content: "/images/social-meta.webp" },
	];
};
const auth = () => {
	const { isLoading, auth } = usePuterStore();
	const location = useLocation();
	const next = location.search.split("next=")[1];
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated) navigate(next);
	}, [auth.isAuthenticated, next, navigate]);

	return (
		<main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
			<div className="gradient-border shadow-lg">
				<section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
					<div className="flex flex-col items-center justify-center gap2 text-center">
						<h1>Welcome</h1>
						<h2>Log in to Continue Your Job Journey</h2>
					</div>
					<div>
						{isLoading ? (
							<button type="button" className="auth-button animate-pulse">
								<p>Signing you in...</p>
							</button>
						) : auth.isAuthenticated ? (
							<button
								type="button"
								className="auth-button"
								onClick={auth.signOut}
							>
								<p>Log Out</p>
							</button>
						) : (
							<button
								type="button"
								className="auth-button"
								onClick={auth.signIn}
							>
								<p>Log In</p>
							</button>
						)}
					</div>
				</section>
			</div>
		</main>
	);
};

export default auth;
