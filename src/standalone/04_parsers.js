import dotenv from 'dotenv';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
dotenv.config();

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  answer: `answer to the user's question`,
});

const formatInstructions = parser.getFormatInstructions();
console.log(formatInstructions);

const prompt = new PromptTemplate({
  template: `be very funny when answering question\n{format_instruction}\nQuestion {question}`,
  inputVariables: ['question'],
  partialVariables: {
    format_instruction: formatInstructions,
  },
});

const llmModel = new OpenAI({
  temperature: 0,
});

const input = await prompt.format({
  question: 'what is the capital of france',
});
console.log(input);

const response = await llmModel.call(input);
console.log(response);
const parsedResponse = await parser.parse(response);
console.log(parsedResponse);
