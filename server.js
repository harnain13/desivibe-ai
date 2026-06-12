const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON packet reading extensions
app.use(express.json());

// Serve all static frontend layout assets from your public folder automatically
app.use(express.static(path.join(__dirname, 'public')));

// Secure Middleman Route Interceptor API Path
app.post('/api/get-vibe', async (req, res) => {
    const { prompt, history, genre } = req.body;
    
    // Pull the key completely hidden from the user's browser window container environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: { message: "Internal Server Error: Secure API key missing on cloud cluster." } });
    }

    let modifiedPrompt = prompt;
    if (genre && genre !== 'all') {
        modifiedPrompt += ` (Heavily prioritize matches strictly inside the ${genre} sonic style genre)`;
    }

    const complexContextPrompt = `You are a music curator tracking context logs. Context:
    ${history ? history.join("\n") : ""}
    User request: ${modifiedPrompt}
    Return ONLY a raw JSON array of 4 popular real Bollywood songs matching the last prompt state. Format exactly like this structure: [{"title": "Song", "artist": "Movie", "duration": "e.g. 4:15", "listeners": "e.g. 1.2M", "reason": "1 customized text sentence."}]`;

    try {
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: complexContextPrompt }] }] })
        });

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error("Backend Proxy Failure:", error);
        return res.status(500).json({ error: { message: "Failed tracking secure proxy route packet connection nodes." } });
    }
});

app.listen(PORT, () => console.log(`Secure Server deploying on port entry mapping: ${PORT}`));