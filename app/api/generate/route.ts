import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getGemini } from '../../../lib/gemini'

const bodySchema = z.object({
	jobDescription: z.string().min(10),
	name: z.string().min(1),
	title: z.string().min(1),
	skills: z.array(z.string()).optional().default([]),
	portfolioLinks: z.array(z.string()).optional().default([]),
	callToAction: z.string().optional().default('Happy to discuss specifics and next steps.'),
	style: z.string().optional().default('Concise professional'),
})

function fallbackTemplate(input: z.infer<typeof bodySchema>): string {
	console.log("fallbackTemplate called");
	const first = (input.jobDescription.trim().split('\n')[0] || '').slice(0, 140)
	const skills = input.skills?.join(', ') || ''
	const links = (input.portfolioLinks || []).map((l) => `- ${l}`).join('\n') || '- Available upon request'
	return (
		`Hi there,\n\n` +
		`I'm ${input.name}, ${input.title}. Based on your post ("${first}"), here’s how I would help:\n\n` +
		`Understanding\n- Your goal: ${first || 'Deliver the described solution'}.\n- Key needs: quality, clarity, timely delivery.\n\n` +
		`Approach\n1) Discovery: Clarify scope and constraints.\n2) Plan: Architecture, milestones, tools.\n3) Implementation: Iterative builds with check-ins.\n4) QA & Handoff: Test, document, launch support.\n\n` +
		`Why me\n- Skills: ${skills || 'Relevant domain expertise'}.\n- Experience: Delivered similar projects end-to-end.\n- Communication: Frequent updates, async-friendly.\n\n` +
		`Relevant work\n${links}\n\n` +
		`Timeline & Next steps\n- I can start this week. First milestone in 3-5 days.\n- ${input.callToAction}\n\n` +
		`If this aligns, I can share a brief plan and kickoff checklist.\n\nBest,\n${input.name}\n`
	)
}

export async function POST(req: NextRequest) {
	try {
		const json = await req.json();
		const input = bodySchema.parse(json);
		const gemini = getGemini();
		console.log("allo", gemini);

		if (!gemini) {
			return NextResponse.json({ proposal: fallbackTemplate(input), usedLLM: false });
		}

		const prompt = `You are an expert freelance proposal writer. Write a tailored proposal.\n` +
			`Use the ${input.style} tone. Keep it under 450-650 words.\n` +
			`Include: (1) understanding, (2) a 3-5 step plan, (3) 2-4 credentials/links, (4) timeline + CTA.\n\n` +
			`Freelancer:\nName: ${input.name}\nTitle: ${input.title}\nSkills: ${(input.skills || []).join(', ')}\nPortfolio links:\n${(input.portfolioLinks || []).map((l) => `- ${l}`).join('\n') || '- (none provided)'}\n\n` +
			`Job Description:\n${input.jobDescription}\n\n`;

		try {
			const result = await gemini.generateContent(
				`You write concise, winning freelance proposals.\n\n${prompt}`
			);

			const response = await result.response;   // <-- important
			const text = response.text().trim();

			console.log("✅ Gemini output:", text);

			return NextResponse.json({
				proposal: text || fallbackTemplate(input),
				usedLLM: Boolean(text)
			});

		} catch (e: any) {
			console.error("❌ Gemini error:", e);
			return NextResponse.json({ proposal: fallbackTemplate(input), usedLLM: false });
		}
	} catch (err: any) {
		return NextResponse.json({ error: err?.message || 'Bad Request' }, { status: 400 });
	}
}
