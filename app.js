const express = require('express');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const lostRoutes = require('./routes/Lostroutes');
const lostRoutes2 = require('./routes/Lostroutes2')
const commentRoutes = require('./routes/commentRoutes');
const commentRoutes2 = require('./routes/2_commentRoutes');



const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/lost', lostRoutes);
app.use('/api/taby', lostRoutes2)
app.use('/api/comments/', commentRoutes);

app.use('/api/comments/tabylganzat', commentRoutes2);
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads/uploads2'));
// app.use('/uploads/uploads2', express.static('uploads'));

app.use(authRoutes); 
app.use('/api/lost', postRoutes); 

// Серверді қосу
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
