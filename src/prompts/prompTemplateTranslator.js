import { ChatPromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { Base } from './base.js';
import {} from 'langchain/llms/';
import { BaseOutputParser } from 'langchain/schema/output_parser';

class CommaSeparatedListOutputParser extends BaseOutputParser {
  async parse(text) {
    return text.split(',').map((item) => item.trim());
  }
}

export class PrompTemplateTranslator extends Base {
  constructor(openAIApiKey) {
    super(openAIApiKey);
  }

  async run() {
    const template = `You are a helpful assistant who generates comma separated lists.
    A user will pass in a category, and you should generate 5 objects in that category in a comma separated list.
    ONLY return a comma separated list, and nothing more.`;

    const humanTemplate = '{text}';

    const chatPrompt = ChatPromptTemplate.fromMessages([
      ['system', template],
      ['human', humanTemplate],
    ]);

    const model = new ChatOpenAI({});
    const parser = new CommaSeparatedListOutputParser();

    const chain = chatPrompt.pipe(model).pipe(parser);

    const result = await chain.invoke({
      text: 'colors',
    });
  }
}
