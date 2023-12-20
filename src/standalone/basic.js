import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

async function chat(input) {
  const messages = [{ role: 'user', content: input }];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });

  return response.choices[0].message.content;
}

const question = 'What is the capital of Italy';

chat(question)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

const promptTemplate = (question) => `
  Be very historic in answering your questions
  Question:${question}
`;

chat(promptTemplate(question))
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
