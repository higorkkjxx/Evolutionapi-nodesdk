# Evolution SDK

Um SDK completo para interagir com a Evolution API, permitindo automação de WhatsApp com todas as funcionalidades disponíveis.

## Instalação

```bash
npm install evolution-sdk
```

## Configuração

Importe e inicialize o SDK com seu URL base e chave de API:

```javascript
const EvolutionSDK = require('evolution-sdk');

const sdk = new EvolutionSDK('https://seu-dominio.com', 'sua-api-key');
```

## Exemplos de Uso

### Instância

#### Criar uma instância

```javascript
// Criar uma nova instância
const response = await sdk.instance.create({
  instanceName: 'minha-instancia',
  qrcode: true
});

// Exibir o QR Code
console.log(response.qrcode.base64);
```

#### Conectar uma instância existente

```javascript
const response = await sdk.instance.connect('minha-instancia');
```

#### Verificar status da conexão

```javascript
const status = await sdk.instance.connectionState('minha-instancia');
console.log(status);
```

### Mensagens

#### Enviar mensagem de texto

```javascript
await sdk.message.sendText('minha-instancia', {
  number: '5511999999999',
  text: 'Olá, esta é uma mensagem de teste!'
});
```

#### Enviar mídia (imagem, vídeo ou documento)

```javascript
await sdk.message.sendMedia('minha-instancia', {
  number: '5511999999999',
  mediatype: 'image',
  mimetype: 'image/jpeg',
  caption: 'Veja esta imagem!',
  media: 'https://exemplo.com/imagem.jpg',
  fileName: 'imagem.jpg'
});
```

#### Enviar botões interativos

```javascript
await sdk.message.sendButtons('minha-instancia', {
  number: '5511999999999',
  title: 'Menu de Opções',
  description: 'Selecione uma das opções abaixo:',
  footer: 'Empresa XYZ',
  buttons: [
    {
      type: 'reply',
      displayText: 'Opção 1',
      id: '1'
    },
    {
      type: 'reply',
      displayText: 'Opção 2',
      id: '2'
    }
  ]
});
```

### Grupos

#### Criar um grupo

```javascript
const group = await sdk.group.create('minha-instancia', {
  subject: 'Meu Grupo',
  description: 'Descrição do grupo',
  participants: [
    '5511999999999',
    '5511888888888'
  ]
});

console.log('Grupo criado:', group.groupId);
```

#### Obter informações de um grupo

```javascript
const info = await sdk.group.findGroupInfos('minha-instancia', '123456789-group@g.us');
console.log(info);
```

### Webhook

#### Configurar webhook

```javascript
await sdk.integrations.events.webhook.set('minha-instancia', {
  webhook: {
    enabled: true,
    url: 'https://seu-webhook.com/callback',
    headers: {
      'Authorization': 'Bearer seu-token'
    },
    events: [
      'MESSAGES_UPSERT',
      'MESSAGES_UPDATE',
      'MESSAGES_DELETE',
      'SEND_MESSAGE'
    ]
  }
});
```

## Documentação completa

O SDK contém todos os endpoints da Evolution API, organizados nos seguintes módulos:

- `instance` - Gerenciamento de instâncias
- `proxy` - Configuração de proxy
- `settings` - Configurações gerais
- `message` - Envio de mensagens
- `call` - Gerenciamento de chamadas
- `chat` - Operações com chats
- `label` - Gerenciamento de etiquetas
- `group` - Operações com grupos
- `integrations` - Integrações com outros serviços
  - `events` - Configuração de eventos
    - `webhook` - Webhooks
    - `websocket` - Websockets
    - `rabbitmq` - RabbitMQ
    - `sqs` - AWS SQS
  - `chatbot` - Integrações de chatbot
    - `chatwoot` - Chatwoot
    - `typebot` - Typebot

## Licença

MIT