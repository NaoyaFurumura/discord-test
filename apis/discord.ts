import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';
import {Request, Response} from 'express'
import {getPublicKey} from '../getEnv'
import * as Express from 'express'
const router = Express.Router();

export function verifyDiscordRequest(key: string = getPublicKey()){
    return (req: Request, res: Response, buffer: Buffer) => {
        const signature = req.get('X-Signature-Ed25519');
        if(signature === undefined){
            throw new Error('Signature is undefined')
        }
        const timestamp = req.get('X-Signature-Timestamp');
        if(timestamp === undefined){
            throw new Error('Timestamp is undefined')
        }

        const isValidRequest = verifyKey(buffer, signature, timestamp, key);
        if (!isValidRequest) {
          res.status(401).send('Bad request signature');
          throw new Error('Bad request signature');
        }
    }
}


interface InteractionRequest extends Request {
    body: {
        data: {
            name: string
        },
        id: string
        type: number
        member:{
            user:{
                username: string
            }
        }
    }
}
type InteractionResponse = ({
    type: typeof webhookConfirmationType
} | {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data:{
        content: string
    }
} )
const webhookConfirmationType = 1
router.post("/interactions", (req: InteractionRequest, res: Response<InteractionResponse>) => {
    const { type } = req.body;
    console.log(req.body)
    if (type === InteractionType.PING) {
        res.send({type: webhookConfirmationType})
        return
    }


    if (req.body.data.name === 'test') {
        res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `you've successfully tested discord interactions! welcome to the future, ${req.body.member.user.username}🔥`
          },
        });
        return
      }
})

export default router