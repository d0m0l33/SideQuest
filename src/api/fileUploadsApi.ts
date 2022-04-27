import { Upload, Web3Storage } from 'web3.storage';
import { WEB3_STORAGE_API_KEY } from '../apiKeys';
import { Web3StorageClient } from '../utils/web3StorageClient';

export const listUploads = async (): Promise<Upload[]> => {
    const uploads = [];
    const client = await Web3StorageClient.getClient();
    if(!client){
        console.error('error crearing ')
        return [];
    }
    client.list()
    for await (const upload of client.list()) {
        let formatted = new Date( upload.created);
        upload.created = formatted.toLocaleString();
        uploads.push(upload);
    }
    return uploads;
}