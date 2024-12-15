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
    try {
      if (!this.thread) {
        await this.initializeThread();
      }

      if (!this.thread) throw new Error('Failed to initialize thread');

      console.log('Sending message to OpenAI:', content);
      
      // Add the user's message to the thread
      await this.openai.beta.threads.messages.create(this.thread, {
        role: 'user',
        content: `Você é SARA, a assistente virtual do SUS. 

Quando o usuário perguntar sobre unidades de saúde ou mencionar uma localização, você DEVE responder APENAS com um JSON no seguinte formato, sem NENHUM texto adicional. Retorne pelo menos 3 unidades diferentes, variando os tipos (UBS, UPA, Hospital):

{
  "type": "healthUnits",
  "units": [
    {
      "name": "UBS Bela Vista",
      "type": "UBS",
      "address": "Rua dos Três Irmãos, 45",
      "distance": "0.5 km",
      "phone": "(11) 3201-4500",
      "waitTime": "15 minutos",
      "occupancyRate": "30%",
      "maxUrgencyLevel": "Baixo",
      "specialties": ["Clínica Geral", "Pediatria"],
      "capacity": {
        "total": "50",
        "available": "35"
      },
      "openingHours": "08:00 - 17:00"
    },
    {
      "name": "UPA Vila Mariana",
      "type": "UPA",
      "address": "Av. Conselheiro Rodrigues Alves, 1234",
      "distance": "1.2 km",
      "phone": "(11) 3202-5500",
      "waitTime": "30 minutos",
      "occupancyRate": "50%",
      "maxUrgencyLevel": "Médio",
      "specialties": ["Emergência", "Clínica Geral", "Ortopedia"],
      "capacity": {
        "total": "100",
        "available": "45"
      },
      "openingHours": "24 horas"
    },
    {
      "name": "Hospital São Paulo",
      "type": "Hospital",
      "address": "Rua Napoleão de Barros, 715",
      "distance": "2.0 km",
      "phone": "(11) 5576-4000",
      "waitTime": "45 minutos",
      "occupancyRate": "75%",
      "maxUrgencyLevel": "Alto",
      "specialties": ["Emergência", "Cirurgia", "UTI", "Maternidade"],
      "capacity": {
        "total": "200",
        "available": "50"
      },
      "openingHours": "24 horas"
    }
  ]
}

Para outras perguntas não relacionadas a localização ou unidades de saúde, responda normalmente como uma assistente virtual do SUS.

Mensagem do usuário: ${content}`,
      });

      console.log('Message sent, running assistant...');

      // Run the assistant
      const run = await this.openai.beta.threads.runs.create(this.thread, {
        assistant_id: OPENAI_CONFIG.assistantId,
      });

      // Wait for the completion
      let runStatus = await this.openai.beta.threads.runs.retrieve(
        this.thread,
        run.id
      );

      console.log('Initial run status:', runStatus.status);

      // Poll for completion
      while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        runStatus = await this.openai.beta.threads.runs.retrieve(
          this.thread,
          run.id
        );
        console.log('Updated run status:', runStatus.status);
      }

      if (runStatus.status === 'failed') {
        throw new Error(`Assistant run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
      }

      // Get the messages
      console.log('Getting messages...');
      const messages = await this.openai.beta.threads.messages.list(this.thread);
      
      // Return the last assistant message
      const lastMessage = messages.data
        .filter((message) => message.role === 'assistant')
        .shift();

      if (!lastMessage) {
        throw new Error('No assistant message found');
      }

      const messageContent = lastMessage.content[0]?.text?.value;
      console.log('Raw message content:', messageContent);

      if (!messageContent) {
        throw new Error('Invalid message content');
      }

      // Try to parse as JSON first
      try {
        const jsonResponse = JSON.parse(messageContent);
        console.log('Parsed JSON response:', jsonResponse);
        return messageContent;
      } catch (e) {
        console.log('Not a JSON response, returning as text');
        return messageContent;
      }
    } catch (error) {
      console.error('OpenAI service error:', error);
      throw error;
    }
  }
}

export const openAIService = new OpenAIService();
