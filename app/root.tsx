import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useEffect } from "react";
import { usePuterStore } from "./lib/puter";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function meta({}: Route.MetaArgs) {
	const appUrl =
		import.meta.env.VITE_APP_URL || "http://localhost:5173";

	return [
		{ title: "CV Resume - AI Resume Analyzer" },
		{ name: "description", content: "Get AI-powered feedback on your resume" },
		{ property: "og:title", content: "CV Resume - AI Resume Analyzer" },
		{ property: "og:description", content: "Get AI-powered feedback on your resume" },
		{ property: "og:image", content: `${appUrl}/images/social-meta.webp` },
		{ property: "og:url", content: appUrl },
		{ property: "og:type", content: "website" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: "CV Resume - AI Resume Analyzer" },
		{ name: "twitter:description", content: "Get AI-powered feedback on your resume" },
		{ name: "twitter:image", content: `${appUrl}/images/social-meta.webp` },
	];
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { init } = usePuterStore();

	useEffect(() => {
		init();
	}, [init]);

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="google-site-verification" content="Vg2zWgG4K3Kz5rM" />
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-RNDCBC2T6F"
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-RNDCBC2T6F');
					`,
					}}
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<script src="https://js.puter.com/v2/"></script>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
