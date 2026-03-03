import type { ReactNode } from "react";
import Navbar from "../navbar/Navbar";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center min-h-screen">
			<Navbar />

			<section className="main-section">{children}</section>
		</main>
	);
};

export default Layout;
