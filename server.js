const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock endpoint for query
app.post('/api/query', (req, res) => {
  const { query } = req.body;
  console.log('Received query:', query);

  // Simulate processing delay
  setTimeout(() => {
    res.json({
      text: "1. Power down the system.\n2. Remove the four bolts on the engine cover using a 10mm socket.\n3. Carefully lift the cover straight up.",
      sources: [
        { title: "Engine Manual X-1000", page: 42, section: "5.2" },
        { title: "Safety Protocol", page: 12, section: "3.1" }
      ],
      reasoning: "Retrieved from engine manual; safety validation passed."
    });
  }, 2000);
});

// Optional: endpoint for approval (just log it)
app.post('/api/approve', (req, res) => {
  console.log('Approved:', req.body);
  res.json({ status: 'approved' });
});

// Optional: endpoint for rejection
app.post('/api/reject', (req, res) => {
  console.log('Rejected:', req.body);
  res.json({ status: 'rejected' });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Mock backend running at http://localhost:${PORT}`);
});