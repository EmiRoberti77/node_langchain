import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { Base } from './base.js';

const prompt = 'what is a good company name for a company that does potatoes?';

export class Prompt extends Base {
  llm;
  chatModel;
  constructor(openAIApiKey) {
    super(openAIApiKey);

    this.llm = new OpenAI({
      openAIApiKey: this.openAIApiKey,
      temperature: 0,
    });

    this.chatModel = new ChatOpenAI();
  }

  async run() {
    const text = prompt;
    const llmResult = await this.llm.predict(text);
    const chatModelResult = await this.chatModel.predict(text);

    console.log('llm result', llmResult);
    console.log('chat result', chatModelResult);
  }
}
