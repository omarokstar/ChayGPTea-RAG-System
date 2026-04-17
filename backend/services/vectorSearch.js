import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const client = new MongoClient(process.env.MONGO_URI);

export async function searchDocs(queryVector, topK = 3) {
  await client.connect();
  const col = client.db('teabot').collection('docs');
  return col.aggregate([
    {
      $vectorSearch: {
        index: 'vector_index',
        path: 'embedding',
        queryVector,
        numCandidates: 50,
        limit: topK,
      },
    },
    { $project: { text: 1, _id: 0 } },
  ]).toArray();
}