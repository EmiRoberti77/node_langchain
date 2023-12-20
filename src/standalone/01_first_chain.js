import dotenv from 'dotenv';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

const model = new OpenAI({ temperature: 0 });
const template =
  'Be very funny when answering questions\n Question: {question}';

const prompt = new PromptTemplate({
  template,
  inputVariables: ['question'],
});

const chain = new LLMChain({ llm: model, prompt: prompt });
const result = await chain.call({
  question: 'what is the capital of France',
});
console.log(result);
