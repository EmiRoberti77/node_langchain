import { PromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { Base } from './base.js';

export class PrompTemplateClass extends Base {
  prompt;
  constructor(openAIApiKey) {
    super(openAIApiKey);

    this.prompt = PromptTemplate.fromTemplate(
      `what is a good name for a company that names {product}?

      format the response in bullets points with three names
      `
    );
  }

  async run() {
    const formattedPrompt = await this.prompt.format({
      product: 'socks',
    });

    console.log(formattedPrompt);

    const llm = new ChatOpenAI();
    const llmResponse = await llm.predict(formattedPrompt);
    console.log('llm promptTemplate\r', llmResponse);
  }
}
