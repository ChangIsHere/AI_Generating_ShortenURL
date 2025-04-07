export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only accept POST request' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'lack of url parameter' });
    }

    try {
        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Generate a short english alias for this url, in 3 words, only return english phrases: ${url}`,
                    },
                ],
            }),
        });

        const data = await openaiRes.json();
        const alias = data.choices?.[0]?.message?.content?.trim().replace(/\s+/g, '-');

        res.status(200).json({ alias });
    } catch (error) {
        console.error('AI Alias Error:', error);
        res.status(500).json({ error: 'Failed to generate AI alias' });
    }
}
