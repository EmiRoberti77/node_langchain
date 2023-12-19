import dotenv from 'dotenv';
import { Prompt } from './prompts/prompt.js';
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
//run basic prompt test
const p = new Prompt(openaiApiKey);
await p.run();
//run template with a prompt
