const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Enable All CORS Requests
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/reservations', async (req, res) => {
    try {
        const apiId = "2d9c6b50a5993f2394805227c70194fd664370daf09fad4a00d74c9ed75f";
        const apiKey = "397dcc793f1f0e8d37eb2e5a00dbad1b3eddc4fee7c9c7c6832fd06ad4c3e00ff0c11b10d7c76061";
        const apiUrl = "https://idia-booking.f4.htw-berlin.de/Web/Services/Reservations/";

        const response = await axios.get(apiUrl, {
            headers: {
                'X-Booked-ApiId': apiId,
                'X-Booked-ApiKey': apiKey,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).send('Error fetching reservations');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
