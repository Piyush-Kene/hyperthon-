import './globals.css'
import type { Metadata } from 'next'
import ThemeToggle from '../components/ThemeToggle'

export const metadata: Metadata = {
	title: 'Freelancer Proposal Generator',
	description: 'Generate tailored freelance proposals instantly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<div className="container py-8">
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-xl font-semibold">Freelancer Proposal Generator</h1>
					<ThemeToggle />
					</div>
					{children}
				</div>
			</body>
		</html>
	)
}


