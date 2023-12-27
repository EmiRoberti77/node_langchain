import { config } from 'dotenv';
config();

import { TextLoader } from 'langchain/document_loaders/fs/text';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { FaissStore } from 'langchain/vectorstores/faiss';

//load file
const loader = new TextLoader('./src/standalone/files/restaurant.txt');
//load into memory
const docs = await loader.load();
//create text splitter
const splitter = new CharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 50,
});
//split the documents
const documents = await splitter.splitDocuments(docs);
console.log(documents);
//convert document to embeddings
const embedding = new OpenAIEmbeddings();
const vectorestore = await FaissStore.fromDocuments(documents, embedding);
await vectorestore.save('./');
//convert a question to a vector
