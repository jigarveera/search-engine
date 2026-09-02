import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL;

export const elasticClient = new Client({
    node: ELASTICSEARCH_URL,
})

export const connectES = async () => {
    await elasticClient.ping()
    console.log(`Elasticsearch connected`)
}