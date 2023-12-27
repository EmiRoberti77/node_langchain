//import and load env variables
import { config } from 'dotenv';
config();
//imports
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { Calculator } from 'langchain/tools/calculator';

//set env variable
process.env.LANGCHAIN_HANDLER = 'langchain';
//create llm model
const model = new ChatOpenAI({
  temperature: 0,
});

//create list of tools
const tools = [new Calculator()];

//init all the tools
const executer = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: 'chat-conversational-react-description',
  verbose: false,
});

//array of questions
const inputs = [
  'what is the capital of France?',
  'what is 100 divided by 12.5?',
];

//get the answers
const res0 = await executer.call({ input: inputs[0] });
const res1 = await executer.call({ input: inputs[1] });

//print output
console.log('res0', res0);
console.log('res1', res1);
