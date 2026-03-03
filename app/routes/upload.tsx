import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { prepareInstructions } from "@/consts";
import { convertPdfToImage } from "@/lib/pdff2image";
import { usePuterStore } from "@/lib/puter";

const upload = () => {
	const { auth, isLoading, fs, ai, kv } = usePuterStore();
	const navigate = useNavigate();

	const [isProcessing, setIsProcessing] = useState(false);
	const [statusText, setStatusText] = useState("");
	const [file, setFile] = useState<File | null>(null);

	const handleFileSelect = (file: File | null) => {
		setFile(file);
	};

	type HandleAnalizeProps = {
		companyName: string;
		jobTitle: string;
		jobDescription: string;
		file: File;
	};
	const handleAnalize = async ({
		companyName,
		jobTitle,
		jobDescription,
		file,
	}: HandleAnalizeProps) => {
		setIsProcessing(true);

		setStatusText("Uploading the file");
		const uploadedFile = await fs.upload([file]);

		if (!uploadedFile) return setStatusText("Error: Failed to upload file");

		setStatusText("Converting to image...");
		const imageFile = await convertPdfToImage(file);
		if (!imageFile.file)
			return setStatusText("Error: Failed to convert PDF to image");

		setStatusText("Uploading the image...");
		const uploadedImage = await fs.upload([imageFile.file]);
		if (!uploadedImage) return setStatusText("Error: Failed to upload image");

		setStatusText("Preparing data ...");

		const uuid = crypto.randomUUID();
		const data = {
			id: uuid,
			resumePath: uploadedFile.path,
			imagePath: uploadedImage.path,
			companyName,
			jobTitle,
			jobDescription,
			feedback: "",
		};

		await kv.set(`resume: ${uuid}`, JSON.stringify(data));

		setStatusText("Analyzing...");

		const feedback = await ai.feedback(
			uploadedFile.path,
			prepareInstructions({ jobTitle, jobDescription }),
		);

		if (!feedback) return setStatusText("Error: Failed to analyze resume");

		const feedbackText =
			typeof feedback.message.content === "string"
				? feedback.message.content
				: feedback.message.content[0].text;

		data.feedback = JSON.parse(feedbackText);
		await kv.set(`resume:${uuid}`, JSON.stringify(data));
		setStatusText("Analysis complete, redirecting...");

		navigate(`/resume/${uuid}`);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent default form submission

		const form = e.currentTarget.closest("form");
		if (!form) return;

		const formData = new FormData(form);

		const companyName = formData.get("company-name") as string;
		const jobTitle = formData.get("job-title") as string;
		const jobDescription = formData.get("job-description") as string;

		if (!file) return;

		handleAnalize({ companyName, jobTitle, jobDescription, file });
	};

	return (
		<Layout>
			<div className="page-heading">
				<h1>Smart feedback for you dream job</h1>
				{isProcessing ? (
					<h2>Analyzing resume...</h2>
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
							<label htmlFor="companyName">Company Name</label>
							<input type="text" name="company-name" id="companyName" />
						</div>

						<div className="form-div">
							<label htmlFor="jobTitle">Job Title </label>
							<input type="text" name="job-title" id="jobTitle" />
						</div>

						<div className="form-div">
							<label htmlFor="jobDescription">Job Description</label>
							<textarea rows={5} name="job-title" id="jobDescription" />
						</div>

						<div className="form-div">
							<label htmlFor="jobUploader">Upload Resume</label>
							<FileUploader onFileSelect={handleFileSelect} />
						</div>

						<button className="primary-button" type="submit">
							Analyze Resume
						</button>
					</form>
				)}
			</div>
		</Layout>
	);
};

export default upload;
