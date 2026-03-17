import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "@/components/ATS";
import Details from "@/components/Details/Details";
import Summary from "@/components/Summary";
import { usePuterStore } from "@/lib/puter";

export const meta = () => [
	{ title: "CV Resume" },
	{ name: "description", content: "Detailed overview of your CV" },
];

const Resume = () => {
	const { auth, isLoading, fs, kv } = usePuterStore();
	const { id } = useParams();
	const [imageUrl, setImageUrl] = useState("");
	const [resumeUrl, setResumeUrl] = useState("");
	const [feedback, setFeedback] = useState<Feedback | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !auth.isAuthenticated)
			navigate(`/auth?next=/resume/${id}`);
	}, [isLoading, navigate, auth, id]);

	useEffect(() => {
		const loadResume = async () => {
			const resume = await kv.get(`resume:${id}`);

			if (!resume) return;

			const data = JSON.parse(resume);

			const resumeBlob = await fs.read(data.resumePath);
			if (!resumeBlob) return;

			const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
			const resumeUrl = URL.createObjectURL(pdfBlob);
			setResumeUrl(resumeUrl);

			const imageBlob = await fs.read(data.imagePath);
			if (!imageBlob) return;
			const imageUrl = URL.createObjectURL(imageBlob);
			setImageUrl(imageUrl);

			setFeedback(data.feedback);
		};

		loadResume();
	}, [id, fs.read, kv.get]);

	const handleRemove = async () => {
		setIsDeleting(true);
		const resume = await kv.get(`resume:${id}`);
		if (resume) {
			const data = JSON.parse(resume);
			await fs.delete(data.resumePath);
			await fs.delete(data.imagePath);
			await kv.delete(`resume:${id}`);
		}
		navigate("/");
	};

	return (
		<main className="pt-0!">
			<nav className="resume-nav">
				<Link to="/" className="back-button">
					<img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
					<span className="text-gray-800 text-sm font-semibold">
						Back to Homepage
					</span>
				</Link>
				<button
					type="button"
					onClick={handleRemove}
					disabled={isDeleting}
					className="remove-button bg-red-400 flex items-center gap-2"
				>
					{isDeleting ? (
						<>
							<svg
								className="animate-spin h-4 w-4 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							<span className="text-white text-sm">Removing...</span>
						</>
					) : (
						<span className="text-white text-sm">Remove</span>
					)}
				</button>
			</nav>
			<div className="flex flex-row w-full max-lg:flex-col-reverse">
				<section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-screen sticky top-0 items-center justify-center">
					{imageUrl && resumeUrl && (
						<div className="animate-fade-in animate-delay-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
							<a href={resumeUrl} target="_blank" rel="noopener noreferrer">
								<img
									src={imageUrl}
									className="w-full h-full object-contain rounded-2xl"
									title="resume"
									alt="resume"
								/>
							</a>
						</div>
					)}
				</section>
				<section className="feedback-section">
					<h2 className="text-4xl text-black! font-bold">Resume Review</h2>
					{feedback ? (
						<div className="flex flex-col gap-8 animate-in fade-in duration-1000">
							<Summary feedback={feedback} />
							<ATS
								score={feedback.ATS.score || 0}
								suggestions={feedback.ATS.tips || []}
							/>
							<Details feedback={feedback} />
						</div>
					) : (
						<img
							src="/images/resume-scan-2.gif"
							className="w-full"
							alt="resume scan"
						/>
					)}
				</section>
			</div>
		</main>
	);
};
export default Resume;