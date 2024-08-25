const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  const { email, roll_number, data } = req.body;

  // Basic input validation
  if (!email || !roll_number || !data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input"
    });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');

  const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
  const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
    ? lowercaseAlphabets.reduce((a, b) => (a > b ? a : b))
    : null;

  res.json({
    is_success: true,
    user_id: "john_doe_17091999", // Replace with dynamic user ID logic
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
