import { config } from 'dotenv';
config();

import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';

//select llm model
const llmChatModel = new ChatOpenAI({
  temperature: 0,
});

//create chat prompt
const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `the following is a friendly conversation between human and AI`
  ),
  new MessagesPlaceholder('history'),
  HumanMessagePromptTemplate.fromTemplate('{input}'),
]);

//select the chain that can store history
const chain = new ConversationChain({
  memory: new BufferMemory({
    returnMessages: true,
    memoryKey: 'history',
  }),
  prompt: chatPrompt,
  llm: llmChatModel,
});

//make first call on the chain
const chatResponse1 = await chain.call({
  input: 'what is the capital of france',
});

//make second call on the chain taking into account what was said in the first call.
const chatResponse2 = await chain.call({
  input: 'what is a good place to see over there?',
});

//response output from question 1 & 2
console.log(chatResponse1.response);
console.log(chatResponse2.response);
