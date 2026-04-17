import { MongoClient } from 'mongodb';
import { embedText } from '../services/embeddings.js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
dotenv.config({ path: './backend/.env' });

const __dirname = dirname(fileURLToPath(import.meta.url));
const teaDocs = JSON.parse(
  readFileSync(join(__dirname, '../data/teaDocs.json'), 'utf-8')
);
async function ingest() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const col = client.db('teabot').collection('teaData');

  await col.deleteMany({});
  console.log(' Cleared old documents\n');

  let success = 0;
  for (const text of teaDocs) {
    try {
      const embedding = await embedText(text);
      await col.insertOne({ text, embedding });
      console.log(`✓ ${text.slice(0, 60)}`);
      success++;
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error(`Failed:`, err.message);
    }
  }

  await client.close();
  console.log(`\n Done! Inserted ${success}/${teaDocs.length} documents.`);
}

ingest();