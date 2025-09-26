import type { Config } from 'tailwindcss'

export default {
	darkMode: 'class',
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				card: {
					DEFAULT: '#0F172A',
					fg: '#E5E7EB',
				},
				accent: '#10B981',
			},
		},
	},
	plugins: [],
} satisfies Config


