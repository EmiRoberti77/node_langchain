import { PrompTemplate } from 'langchain/prompts';
import { Base } from './base';

export class PrompTemplate extends Base {
  constructor(openAIApiKey) {
    super(openAIApiKey);
  }
}
