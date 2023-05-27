import { InteractionResponseType } from 'discord-interactions';
import discordRouter, { verifyDiscordRequest } from './discord'
import * as dotenv from 'dotenv'
dotenv.config();

const express = require('express')
const app = express()

app.use(express.json({ verify: verifyDiscordRequest() }));
app.use('/discord', discordRouter);
app.post("/", (req: any, res: any) => {
    res.send({type: 1})
    return
})

app.listen(3000, ()=>{
    console.log('Server is listening to port 3000 successfully')
})