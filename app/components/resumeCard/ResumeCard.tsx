import { Link } from "react-router";
import ScoreCircle from "../scoreCircle/ScoreCircle";

type ResumeProps = {
	resume: Resume;
};

export default function ResumeCard({
	resume: { id, companyName, jobTitle, feedback, imagePath },
}: ResumeProps) {
	return (
		<Link to={`/resume/${id}`} className="resume-card animate-fade-in">
			<div className="resume-card-header">
				<div className="flex flex-col gap-2">
					{companyName && (
						<h2 className="text-black! font-bold wrap-break-words">
							{companyName}
						</h2>
					)}
					{jobTitle && (
						<h3 className="text-lg wrap-break-words text-gray-500">
							{jobTitle}
						</h3>
					)}
					{!companyName && !jobTitle && (
						<h2 className="text-black! font-bold">Resume</h2>
					)}
				</div>
				<div className="shrink-0">
					<ScoreCircle score={feedback.overallScore} />
				</div>
			</div>
			<div className="gradient-border animate-fade-in duration-1000">
				<div className="w-full h-full">
					<img
						src={imagePath}
						alt="resume"
						className="w-full h-87.5 max-sm:h-50 object-cover object-top"
					/>
				</div>
			</div>
		</Link>
	);
}
