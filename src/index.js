import express from 'express'
import authRoute from "./routes/auth.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/auth', authRoute)

app.get("/", async (req, res) => {
    return res.status(200).json({
        message: "Hello API",
    })
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})