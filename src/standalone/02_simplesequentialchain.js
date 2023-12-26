import dotenv from 'dotenv';
import { OpenAI } from 'langchain/llms/openai';
import { SimpleSequentialChain, LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
console.log(apiKey);

const model = new OpenAI({ temperature: 0 });
//create template 1 string
const responseTemplate1 = `
You are a helpful bot that creates a 'thank you' response text.
If customers are unsatisfied, offer them a real world assistant to talk to.
You will get a sentiment and subject as input and evaluate.

text: {input}
`;

//create template 1 string
const responseTemplate2 = `
You are an assistant bot. Your job is to make the customer feel heard and understood.
Reflect on the input you receive.

text: {input}
`;

// build PromptTemplate 1
const promptTemplate1 = new PromptTemplate({
  template: responseTemplate1,
  inputVariables: ['input'],
});
// build PromptTemplate 2
const promptTemplate2 = new PromptTemplate({
  template: responseTemplate2,
  inputVariables: ['input'],
});
// create chain LLMChain 1
const llm1 = new LLMChain({
  llm: model,
  prompt: promptTemplate1,
});
// create chain LLMChain 2
const llm2 = new LLMChain({
  llm: model,
  prompt: promptTemplate2,
});
//link the chains
const sequentialChain = new SimpleSequentialChain({
  chains: [llm1, llm2],
  verbose: true,
});
//run the linked chain with a call function ( makes sure input is the same) for both templates
const response = await sequentialChain.call({
  input: 'i ordered pizza and it was awful!',
});

console.log(response);
