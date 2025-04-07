export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST allowed' });
    }

    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Missing URL' });
    }

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        const shortUrl = await response.text();

        if (!shortUrl.startsWith('http')) {
            throw new Error('TinyURL did not return a valid short URL');
        }

        res.status(200).json({ result_url: shortUrl });
    } catch (err) {
        console.error('TinyURL Error:', err);
        res.status(500).json({ error: 'Failed to shorten link via TinyURL' });
    }
}

