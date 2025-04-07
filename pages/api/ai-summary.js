export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'only support post requests' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'no url parameters' });
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
                        content: `conclude the possible content of this page in one sentence: ${url}`,
                    },
                ],
            }),
        });

        if (!openaiRes.ok) {
            const errorText = await openaiRes.text();
            console.error('OpenAI Alias Error Response:', errorText);
            return res.status(500).json({ error: 'OpenAI alias failed' });
        }

        const data = await openaiRes.json();
        const summary = data.choices?.[0]?.message?.content?.trim();

        res.status(200).json({ summary });
    } catch (error) {
        console.error('AI Summary Error:', error);
        res.status(500).json({ error: 'AI failed to conclude' });
    }
}
