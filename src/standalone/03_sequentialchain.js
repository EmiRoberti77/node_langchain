import dotenv from 'dotenv';
dotenv.config();

import { SequentialChain, LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

const llm = new OpenAI({ temperature: 0 });

let template = `you ordered a {dish_name} and the experience was {experience}. Write a review`;

const promptTemplate1 = new PromptTemplate({
  template,
  inputVariables: ['dish_name', 'experience'],
});

const reviewChain = new LLMChain({
  llm,
  prompt: promptTemplate1,
  outputKey: 'review',
});

template = `translate the review in {language}`;

const promptTemplate2 = new PromptTemplate({
  template,
  inputVariables: ['language'],
});

const translateChain = new LLMChain({
  llm,
  prompt: promptTemplate2,
  outputKey: 'italian_translation',
});

const sequentialChain = new SequentialChain({
  chains: [reviewChain, translateChain],
  inputVariables: ['dish_name', 'experience', 'language'],
  outputVariables: ['review', 'italian_translation'],
});

const response = await sequentialChain.call({
  dish_name: 'Lasagna',
  experience: 'amazing',
  language: 'Italian',
});

console.log(response);
