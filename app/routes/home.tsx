import Navbar from "~/components/navbar/Navbar";
import ResumeCard from "~/components/resumeCard/ResumeCard";
import { resumes } from "~/data/api-response";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Resumind" },
		{ name: "description", content: "Smart feeback for your fream job" },
	];
}

export default function Home() {
	return (
		<main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center min-h-screen">
			<Navbar />

			{window.puter.ai.chat()}
			<section className="main-section">
				<div className="page-heading py-16">
					<h1>Track Your applications & Resume Ratings</h1>
					<h2>Review your submissions and check AI-powered feedback.</h2>
				</div>

				{resumes.length > 0 && (
					<div className="resumes-section">
						{resumes.map((resume) => (
							<ResumeCard key={resume.id} resume={resume} />
						))}
					</div>
				)}
			</section>
		</main>
	);
}
