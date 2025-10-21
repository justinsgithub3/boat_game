import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { promises as fs} from 'fs'; // allows for async file reading
//import cookieParser from 'cookie-parser';
import { Pool } from 'pg';

const app = express();

// parse json data
app.use(express.json());


// database stuff - this will run every single request. Make it a module
// put pool, dotenv, in a module and export the pool

// import pool from '../db/..'


const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false // Render uses self-signed certs
    }
})

// adds a cookie property to web request obj. and response obj.
//app.use(cookieParser());

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

app.get('/level/:id', async (req, res) => {
    const levelId = req.params.id;
    const filePath = path.join(__dirname, 'src', `parking/levels/${levelId}.json`);

    try { 
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        console.log(`a user requested level ${levelId}`)
        
        res.type('application/json').send(jsonData);

    } catch (error) {
        return res.status(404).json({error: 'Level not found' });
    }
})

app.get('/levels', async (req, res) => {
    const filePath = path.join(__dirname, 'src', `parking/levels`);

    try { 
        const files = await fs.readdir(filePath);
        const fileCount = files.length;
        // put file count in a json format
        const levelCount = {"count": fileCount};
        // send json to client
        res.type('application/json').send(levelCount);
    }
    catch (error) {
        return res.status(404).json({error: 'No levels found' });
    }
})

// explore mode
app.get('/explore/:id', async (req, res) => {
    //const levelId = req.params.id;
    const levelId = 1;                                          // currently anything deafaults to the first file
    const filePath = path.join(__dirname, 'src', `/explore/${levelId}.json`);

    try { 
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        console.log(`a user requested the world file`)
        res.type('application/json').send(jsonData);

    } catch (error) {
        return res.status(404).json({error: 'Level not found' });
    }
})

// survival mode
app.get('/survival/:id', async (req, res) => {
    //const levelId = req.params.id;
    const levelId = 1;                                          // currently anything deafaults to the first file
    const filePath = path.join(__dirname, 'src', `/survival/${levelId}.json`);



    try { 
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        console.log(`a user requested the game file`)
        res.type('application/json').send(jsonData);

    } catch (error) {
        return res.status(404).json({error: 'Level not found' });
    }
})

// database - testing
app.get('/survival-data', async (req, res) => {

    const client = await pool.connect();
    try { 
        // add a seleect statement here
        const { rows } = await client.query("SELECT name, time " +
                                            "FROM survival_times " +
                                            "ORDER BY time DESC " +
                                            "LIMIT 15 "
                                            );
        res.type('application/json').send({rows});
      
    } catch (error) {
        return res.status(404).json({error: 'Database not found' });
    } finally {
        client.release();
    }
})

// posting survival data to database
app.post('/survival', async (req, res) => {
    const name = req.body.name;
    const time = req.body.time;

    const client = await pool.connect();
    try {
        // move to a database module
        await client.query("INSERT INTO survival_times (name, time) VALUES ($1, $2)", [name, time]);

    } catch (err) {
        console.error(err);
        console.log("Error uploading data");
    } finally {
        client.release();
    }
});







app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})