// QuickBaas.lk — Backend entry point (placeholder)
// TODO: set up Express app, middleware, and route mounting

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('QuickBaas.lk API — running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
