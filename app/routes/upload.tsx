import React, { type FormEvent, useId, useState } from "react";
import FileUploader from "~/components/fileUploader";
import Layout from "~/components/layout";

const upload = () => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [statusText, setStatusText] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		// console.log(e);
	};

	const companyName = useId();
	const jobTitle = useId();
	const jobDescription = useId();
	const jobUploader = useId();

	return (
		<Layout>
			<div className="page-heading">
				<h1>Smart feedback for you dream job</h1>
				{isProcessing ? (
					<>
						<h2>{statusText}</h2>
						<img
							src="/images/resume-scan.gif"
							className="w-full"
							alt="resume"
						/>
					</>
				) : (
					<h2>Drop your resume for an ATS score and improvement tips</h2>
				)}

				{!isProcessing && (
					<form
						id="upload-form"
						onSubmit={handleSubmit}
						className="flex flex-col gap-4"
					>
						<div className="form-div">
							<label htmlFor={companyName}>Company Name</label>
							<input type="text" name="company-name" id={companyName} />
						</div>

						<div className="form-div">
							<label htmlFor={jobTitle}>Job Title </label>
							<input type="text" name="job-title" id={jobTitle} />
						</div>

						<div className="form-div">
							<label htmlFor={jobDescription}>Job Description</label>
							<textarea rows={5} name="job-title" id={jobDescription} />
						</div>

						<div className="form-div">
							<label htmlFor={jobUploader}>Upload Resume</label>
							<FileUploader />
						</div>

						<button className="primary-button" type="submit">
							{" "}
							Analyze Resume
						</button>
					</form>
				)}
			</div>
		</Layout>
	);
};

export default upload;
