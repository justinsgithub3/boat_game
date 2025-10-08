import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 

const app = express();

// get the directory name

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 8080;



app.get(['/', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/index.html'));
})

app.get('/survival', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/survival.html'));
})

app.get('/parking', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/parking.html'));
})

app.get('/explore', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views/explore.html'));
})







app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})