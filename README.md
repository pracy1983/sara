# SARA - Sistema de Acolhimento, Recepção e Atendimento

SARA é um sistema web moderno desenvolvido para ajudar usuários a encontrar unidades de saúde do SUS próximas à sua localização. O sistema conta com um chatbot interativo que facilita a busca e fornece informações relevantes sobre as unidades de saúde.

## Funcionalidades

- 🤖 Chatbot interativo para atendimento
- 📍 Geolocalização para encontrar unidades próximas
- 🎙️ Suporte a comandos de voz
- 🏥 Informações detalhadas sobre unidades de saúde
- ⌚ Tempo de espera em tempo real
- 📱 Interface responsiva e moderna

## Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Vite
- OpenAI Assistant
- Lucide React (para ícones)

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Chave de API da OpenAI

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/pracy1983/sara.git
cd sara
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione sua chave de API da OpenAI:
   ```
   VITE_OPENAI_API_KEY=sua_chave_api_aqui
   ```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse `http://localhost:5173` no seu navegador

## Estrutura do Projeto

```
sara/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   │   └── ChatBot/   # Componentes relacionados ao chatbot
│   ├── data/          # Dados mockados e constantes
│   ├── types/         # Definições de tipos TypeScript
│   ├── utils/         # Funções utilitárias
│   ├── services/      # Serviços de API
│   ├── config/        # Configurações
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Ponto de entrada da aplicação
├── public/            # Arquivos estáticos
└── ...                # Arquivos de configuração
```

## Como Contribuir

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Seu Nome - [@seutwitter](https://twitter.com/seutwitter)

Link do Projeto: [https://github.com/pracy1983/sara](https://github.com/pracy1983/sara)
