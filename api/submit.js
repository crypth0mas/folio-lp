export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get the raw body (multipart/form-data)
        const formData = await new Promise((resolve, reject) => {
            const chunks = [];
            req.on('data', (chunk) => chunks.push(chunk));
            req.on('end', () => resolve(Buffer.concat(chunks)));
            req.on('error', reject);
        });

        // Forward the request to the actual backend
        const response = await fetch('http://51.77.144.120:3000/api/sites', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer GHbzddSZdzVYU66AGgudzg-vVTZvuiv',
                'Content-Type': req.headers['content-type'],
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: 'Failed to submit form' });
    }
}
