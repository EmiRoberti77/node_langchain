import { config } from 'dotenv';
config();

import { CharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';
import { FaissStore } from 'langchain/vectorstores/faiss';

//create emdedding to emded user question
const embedding = new OpenAIEmbeddings();
const vectorStore = await FaissStore.load('./', embedding);

//create llm model
const llmModel = new OpenAI({ temperature: 0 });

//create chain to link llm model and vector
const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(llmModel),
  retriever: vectorStore.asRetriever(),
  returnSourceDocuments: true,
});

//make a call on the chain
const res = await chain.call({
  query: 'When does the restaurant close on a friday?',
});

console.log(res.text);
