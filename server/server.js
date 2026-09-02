import app from './src/app.js'
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, `${HOST}`, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})