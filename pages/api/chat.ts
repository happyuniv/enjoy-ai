// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body
  const payload = {
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
    temperature: 0.7,
  }

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()
  const result = data.choices[0].text

  return res.json(result)
}
