export const getPublicKey = (): string=>{
    if(process.env.PUBLIC_KEY === undefined){
        throw new Error('Public key is undefined')
    }
    return process.env.PUBLIC_KEY
}