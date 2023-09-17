
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import OpenAI from "openai";
dotenv.config();




const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json())

const API_KEY = process.env.API_KEY;



const openai = new OpenAI({
    apiKey: API_KEY
});

app.post('/completions', async (req: Request, res: Response) => {
    try {

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: "Create a SQL request to" + req.body.message }]
        })

        res.send(completion.choices[0].message)

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")

    }

})

app.listen(PORT, () => console.log(`Server running on port${PORT}`));