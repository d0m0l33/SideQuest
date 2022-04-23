import { Upload, Web3Storage } from 'web3.storage';
import { WEB3_STORAGE_API_KEY } from '../global/apiKeys';

export const listUploads = async (): Promise<Upload[]> => {
    const uploads = [];
    const client = new Web3Storage({ token: WEB3_STORAGE_API_KEY })
    client.list()
    for await (const upload of client.list()) {
        let formatted = new Date( upload.created);
        upload.created = formatted.toLocaleString();
        uploads.push(upload);
    }
    return uploads;
}