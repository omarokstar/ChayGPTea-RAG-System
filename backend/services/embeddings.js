import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({ token: process.env.CO_API_KEY });

export async function embedText(text) {
  const res = await cohere.embed({
    texts: [text],
    model: 'embed-multilingual-v3.0',
    inputType: 'search_document',
  });
  return res.embeddings[0];
}