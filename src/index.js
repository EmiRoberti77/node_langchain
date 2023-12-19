import dotenv from 'dotenv';
import { Prompt } from './prompts/prompt.js';
import { PrompTemplateClass } from './prompts/prompTemplate.js';
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
//run basic prompt test
const p = new Prompt(openaiApiKey);
await p.run();
//run template with a prompt
const pt = new PrompTemplateClass(openaiApiKey);
await pt.run();
