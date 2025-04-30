import express from 'express';
import cors from 'cors';
import ViteExpress from 'vite-express';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ViteExpress.listen(app, PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT} ...`);
});
