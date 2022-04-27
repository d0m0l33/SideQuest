import {  Web3Storage } from "web3.storage";
import { WEB3_STORAGE_API_KEY } from "../apiKeys";

export class Web3StorageClient {
    private static client: Web3Storage|null;
    private constructor() {}

    // Ensure that there is only one instance created
    public static async getClient():Promise<Web3Storage> {
        if (!Web3StorageClient.client) {
            Web3StorageClient.client = new Web3Storage({ token: WEB3_STORAGE_API_KEY ?WEB3_STORAGE_API_KEY : ''});            
        }        
        return Web3StorageClient.client
    }
}