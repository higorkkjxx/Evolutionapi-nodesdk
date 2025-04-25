# Guia de Introdução ao Evolution SDK

## O que é o Evolution SDK?

O Evolution SDK é uma biblioteca JavaScript que permite integrar facilmente a Evolution API em suas aplicações Node.js. A Evolution API é uma solução para automação de WhatsApp que oferece recursos avançados como:

- Gerenciamento de múltiplas instâncias
- Envio de mensagens de texto, mídia, botões e listas
- Gerenciamento de grupos
- Configuração de webhooks e websockets
- Integrações com chatbots como Typebot e Chatwoot
- Suporte a proxies para evitar banimentos
- E muito mais!

## Instalação

Instale o SDK via npm:

```bash
npm install evolution-sdk
```

## Configuração Básica

Para começar a usar o SDK, importe-o em seu projeto e inicialize com o URL base da sua API e a chave de API:

```javascript
const EvolutionSDK = require('evolution-sdk');

// Inicializar o SDK
const sdk = new EvolutionSDK(
  'https://sua-api.exemplo.com', // URL da sua API
  'sua-api-key'                 // Chave de API
);
```

## Criando sua Primeira Instância

Uma instância representa uma conexão ao WhatsApp. Para criar uma nova instância:

```javascript
// Função assíncrona para criar instância
async function createInstance() {
  try {
    const instance = await sdk.instance.create({
      instanceName: 'minha-instancia',
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS'
    });
    
    // Verificar se temos um QR Code para escanear
    if (instance.qrcode && instance.qrcode.base64) {
      console.log('Escaneie o QR Code:');
      console.log(instance.qrcode.base64);
    }
    
    return instance;
  } catch (error) {
    console.error('Erro ao criar instância:', error.message);
    throw error;
  }
}

// Chamada da função
createInstance();
```

## Verificando o Status da Conexão

Você pode verificar o status da conexão de uma instância:

```javascript
async function checkConnection(instanceName) {
  try {
    const status = await sdk.instance.connectionState(instanceName);
    console.log('Status da conexão:', status);
    return status;
  } catch (error) {
    console.error('Erro ao verificar conexão:', error.message);
    throw error;
  }
}
```

## Enviando Mensagens

### Mensagem de Texto

```javascript
async function sendTextMessage(instanceName, number, message) {
  try {
    const result = await sdk.message.sendText(instanceName, {
      number: number,
      text: message
    });
    console.log('Mensagem enviada:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.message);
    throw error;
  }
}
```

### Mensagem com Mídia

```javascript
async function sendImageMessage(instanceName, number, imageUrl, caption) {
  try {
    const result = await sdk.message.sendMedia(instanceName, {
      number: number,
      mediatype: 'image', // Pode ser 'image', 'video' ou 'document'
      mimetype: 'image/jpeg',
      caption: caption,
      media: imageUrl,
      fileName: 'imagem.jpg'
    });
    console.log('Imagem enviada:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar imagem:', error.message);
    throw error;
  }
}
```

### Mensagem com Botões

```javascript
async function sendButtonsMessage(instanceName, number) {
  try {
    const result = await sdk.message.sendButtons(instanceName, {
      number: number,
      title: 'Menu de Opções',
      description: 'Escolha uma das opções abaixo:',
      footer: 'Empresa XYZ',
      buttons: [
        {
          type: 'reply',
          displayText: 'Ver Produtos',
          id: 'products'
        },
        {
          type: 'reply',
          displayText: 'Falar com Atendente',
          id: 'agent'
        },
        {
          type: 'url',
          displayText: 'Visitar Site',
          url: 'https://seu-site.com'
        }
      ]
    });
    console.log('Mensagem com botões enviada:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar mensagem com botões:', error.message);
    throw error;
  }
}
```

## Gerenciamento de Grupos

### Criar um Grupo

```javascript
async function createGroup(instanceName, name, participants) {
  try {
    const result = await sdk.group.create(instanceName, {
      subject: name,
      description: 'Grupo criado via Evolution SDK',
      participants: participants // Array de números
    });
    console.log('Grupo criado:', result);
    return result;
  } catch (error) {
    console.error('Erro ao criar grupo:', error.message);
    throw error;
  }
}
```

### Adicionar Participantes a um Grupo

```javascript
async function addParticipantsToGroup(instanceName, groupId, participants) {
  try {
    const result = await sdk.group.updateParticipant(instanceName, groupId, {
      action: 'add',
      participants: participants // Array de números
    });
    console.log('Participantes adicionados:', result);
    return result;
  } catch (error) {
    console.error('Erro ao adicionar participantes:', error.message);
    throw error;
  }
}
```

## Configuração de Proxy

Para reduzir o risco de banimento, você pode configurar proxies para suas instâncias:

```javascript
async function configureProxy(instanceName) {
  try {
    const result = await sdk.proxy.set(instanceName, {
      enabled: true,
      host: 'proxy.exemplo.com',
      port: '8080',
      protocol: 'http',
      username: 'user',
      password: 'pass'
    });
    console.log('Proxy configurado:', result);
    return result;
  } catch (error) {
    console.error('Erro ao configurar proxy:', error.message);
    throw error;
  }
}
```

## Configuração de Webhook

Para receber notificações em tempo real dos eventos do WhatsApp:

```javascript
async function configureWebhook(instanceName, webhookUrl) {
  try {
    const result = await sdk.integrations.events.webhook.set(instanceName, {
      webhook: {
        enabled: true,
        url: webhookUrl,
        headers: {
          'Authorization': 'Bearer seu-token'
        },
        events: [
          'MESSAGES_UPSERT',
          'MESSAGES_UPDATE',
          'MESSAGES_DELETE',
          'SEND_MESSAGE',
          'CONNECTION_UPDATE'
        ]
      }
    });
    console.log('Webhook configurado:', result);
    return result;
  } catch (error) {
    console.error('Erro ao configurar webhook:', error.message);
    throw error;
  }
}
```

## Integração com Chatbots

### Chatwoot

```javascript
async function configureChatwoot(instanceName) {
  try {
    const result = await sdk.integrations.chatbot.chatwoot.set(instanceName, {
      enabled: true,
      accountId: '1',
      token: 'sua-token-chatwoot',
      url: 'https://chatwoot.exemplo.com',
      signMsg: true,
      reopenConversation: true,
      nameInbox: 'whatsapp',
      importContacts: true,
      importMessages: true
    });
    console.log('Chatwoot configurado:', result);
    return result;
  } catch (error) {
    console.error('Erro ao configurar Chatwoot:', error.message);
    throw error;
  }
}
```

### Typebot

```javascript
async function configureTypebot(instanceName) {
  try {
    const result = await sdk.integrations.chatbot.typebot.create(instanceName, {
      enabled: true,
      url: 'https://typebot.exemplo.com',
      typebot: 'seu-fluxo-typebot',
      triggerType: 'keyword',
      triggerOperator: 'contains',
      triggerValue: 'atendimento',
      expire: 60,
      keywordFinish: '#SAIR'
    });
    console.log('Typebot configurado:', result);
    return result;
  } catch (error) {
    console.error('Erro ao configurar Typebot:', error.message);
    throw error;
  }
}
```

## Tratamento de Erros

O SDK utiliza Promises e async/await, então você deve sempre tratar erros adequadamente:

```javascript
async function exampleWithErrorHandling() {
  try {
    // Operações do SDK
  } catch (error) {
    // Verificar tipo de erro
    if (error.message.includes('401')) {
      console.error('Erro de autenticação. Verifique sua API Key.');
    } else if (error.message.includes('404')) {
      console.error('Recurso não encontrado. Verifique o nome da instância.');
    } else {
      console.error('Erro desconhecido:', error.message);
    }
    
    // Registro detalhado
    console.error('Detalhes do erro:', error);
    
    // Pode-se também notificar um sistema de monitoramento
    // notifyMonitoringSystem(error);
  }
}
```

## Próximos Passos

Agora que você conhece o básico do Evolution SDK, você pode:

1. Explorar a documentação completa para conhecer todos os recursos disponíveis
2. Verificar os exemplos na pasta `/examples`
3. Implementar uma solução de automação de WhatsApp para seu negócio

Para mais detalhes, consulte o [README.md](../README.md) e os exemplos práticos.
