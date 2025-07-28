const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes'); // Жоғалған зат маршруты
const lostRoutes = require('./routes/Lostroutes');
const lostRoutes2 = require('./routes/Lostroutes2')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/lost', lostRoutes);
app.use('/api/taby', lostRoutes2)
app.use('/uploads', express.static('uploads'));

// Маршруттар
app.use(authRoutes); // мысалы, /api/auth/...
app.use('/api/lost', postRoutes); // ✅ МІНДЕТТІ: /api/lost/add сияқты жұмыс істейді

// Серверді қосу
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
