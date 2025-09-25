import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 

const app = express();

// get the directory name

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 8080;




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})