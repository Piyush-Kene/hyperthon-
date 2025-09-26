"use client"

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const [dark, setDark] = useState(false)

	useEffect(() => {
		const stored = localStorage.getItem('theme')
		const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
		const shouldDark = stored ? stored === 'dark' : prefers
		setDark(shouldDark)
		document.documentElement.classList.toggle('dark', shouldDark)
	}, [])

	function toggle() {
		const next = !dark
		setDark(next)
		document.documentElement.classList.toggle('dark', next)
		localStorage.setItem('theme', next ? 'dark' : 'light')
	}

	return (
		<button onClick={toggle} className="rounded px-3 py-1 border border-white/10">
			{dark ? '🌙 Dark' : '☀️ Light'}
		</button>
	)
}


