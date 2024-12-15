import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../config/openai';

class OpenAIService {
  private openai: OpenAI;
  private thread: string | null = null;

  constructor() {
    this.openai = new OpenAI({
      apiKey: OPENAI_CONFIG.apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  async initializeThread() {
    const thread = await this.openai.beta.threads.create();
    this.thread = thread.id;
    return thread.id;
  }

  async sendMessage(content: string) {
    if (!this.thread) {
      await this.initializeThread();
    }

    if (!this.thread) throw new Error('Failed to initialize thread');

    // Add the user's message to the thread
    await this.openai.beta.threads.messages.create(this.thread, {
      role: 'user',
      content,
    });

    // Run the assistant
    const run = await this.openai.beta.threads.runs.create(this.thread, {
      assistant_id: OPENAI_CONFIG.assistantId,
    });

    // Wait for the completion
    let runStatus = await this.openai.beta.threads.runs.retrieve(
      this.thread,
      run.id
    );

    // Poll for completion
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await this.openai.beta.threads.runs.retrieve(
        this.thread,
        run.id
      );
    }

    // Get the messages
    const messages = await this.openai.beta.threads.messages.list(this.thread);
    
    // Return the last assistant message
    const lastMessage = messages.data
      .filter((message) => message.role === 'assistant')
      .shift();

    return lastMessage?.content[0]?.text?.value || 'Desculpe, não consegui processar sua mensagem.';
  }
}

export const openAIService = new OpenAIService();
