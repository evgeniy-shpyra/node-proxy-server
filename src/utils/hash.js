import { createHmac } from 'node:crypto';

const secret = 'my-secret';

export const getHash = (text) => {
    const hash = createHmac('sha256', secret) 
        .update(text)
        .digest('hex');
    return hash
}

export const checkHash = (hash, text) => {
    const textHash = getHash(text)
    return textHash === hash
}