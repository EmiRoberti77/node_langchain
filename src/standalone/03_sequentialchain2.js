//imports
import dotenv from 'dotenv';
import { OpenAI } from 'langchain/llms/openai';
import { SequentialChain, LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
dotenv.config();

//llm model (open ai)
const llm = new OpenAI({ temperature: 0 });
//create template
var template = `describe how to cook a {dish_name} and the {experience}`;

//create prompt 1
const promptTemplate1 = new PromptTemplate({
  template,
  inputVariables: ['dish_name', 'experience'],
});

//attach to chain
const llm1 = new LLMChain({
  llm,
  prompt: promptTemplate1,
  outputKey: 'recipe',
});

//create prompt 2
template = `translate the recipe in {language}`;

const promptTemplate2 = new PromptTemplate({
  template,
  inputVariables: ['language'],
});

//create second chain
const llm2 = new LLMChain({
  llm,
  prompt: promptTemplate2,
  outputKey: 'translation',
});

//link all chains
//pass all input variables
//link this chain to output key from chain 2
const sequentialChain = new SequentialChain({
  chains: [llm1, llm2],
  inputVariables: ['dish_name', 'experience', 'language'],
  outputVariables: ['recipe', 'translation'],
});

//make a call on the chain with all the input variable and the input prompt
const result = await sequentialChain.call({
  dish_name: 'fish pie',
  experience: 'fun',
  language: 'italian',
});

console.log(result);
