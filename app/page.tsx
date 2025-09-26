"use client"

import { useMemo, useState } from 'react'

type FormState = {
	name: string
	title: string
	skills: string
	portfolio: string
	style: string
	cta: string
	job: string
}

export default function Page() {
	const [form, setForm] = useState<FormState>({
		name: '',
		title: '',
		skills: '',
		portfolio: '',
		style: 'Concise professional',
		cta: 'Happy to discuss specifics and next steps.',
		job: '',
	})
	const [loading, setLoading] = useState(false)
	const [proposal, setProposal] = useState('')

	const canSubmit = useMemo(() => {
		return !!form.name && !!form.title && form.job.trim().length > 10
	}, [form])

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!canSubmit) return
		setLoading(true)
		setProposal('')
		try {
			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: form.name,
					title: form.title,
					skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
					portfolioLinks: form.portfolio.split(',').map((s) => s.trim()).filter(Boolean),
					style: form.style,
					callToAction: form.cta,
					jobDescription: form.job,
				}),
			})
			const json = await res.json()
			if (!res.ok) throw new Error(json?.error || 'Failed')
			setProposal(json.proposal || '')
		} catch (err: any) {
			setProposal(err?.message || 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="grid gap-6">
			<div className="card p-5">
				<p className="opacity-80 mb-2">Paste a job description and instantly get a tailored proposal.</p>

			<form onSubmit={onSubmit} className="grid gap-4">
				<div className="grid gap-2 md:grid-cols-2">
					<label className="grid gap-1">
						<span className="text-sm">Name</span>
						<input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
					</label>
					<label className="grid gap-1">
						<span className="text-sm">Title</span>
						<input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Full-Stack Developer | AI Engineer" />
					</label>
				</div>

				<label className="grid gap-1">
					<span className="text-sm">Key skills (comma-separated)</span>
					<textarea className="textarea" rows={2} value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="Python, Next.js, MongoDB, Gemini" />
				</label>

				<label className="grid gap-1">
					<span className="text-sm">Portfolio/case studies (comma-separated)</span>
					<textarea className="textarea" rows={2} value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })} placeholder="https://your-site.com/case1, https://github.com/you/repo" />
				</label>

				<div className="grid gap-2 md:grid-cols-2">
					<label className="grid gap-1">
						<span className="text-sm">Tone/style</span>
						<select className="select" value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })}>
							<option>Concise professional</option>
							<option>Confident and friendly</option>
							<option>Formal business</option>
							<option>Upwork style</option>
						</select>
					</label>
					<label className="grid gap-1">
						<span className="text-sm">Call to action</span>
						<input className="input" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} placeholder="Available to start this week; can deliver a draft in 48h." />
					</label>
				</div>

				<label className="grid gap-1">
					<span className="text-sm">Job description</span>
					<textarea className="textarea" rows={10} value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })} placeholder="Paste the client's job post here…" />
				</label>

				<button disabled={!canSubmit || loading} className="btn-primary">
					{loading ? 'Generating…' : 'Generate Proposal'}
				</button>
			</form>

			{proposal && (
				<div className="mt-8 card p-4">
					<h2 className="text-xl font-semibold mb-2">Your Proposal</h2>
					<textarea className="w-full textarea" rows={16} value={proposal} onChange={() => {}} />
				</div>
			)}
			</div>
		</div>
	)
}


