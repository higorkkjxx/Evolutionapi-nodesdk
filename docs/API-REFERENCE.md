# Referência da API do Evolution SDK

Este documento fornece uma referência completa para todas as funções disponíveis no Evolution SDK.

## Índice

- [Configuração](#configuração)
- [Instância](#instância)
- [Proxy](#proxy)
- [Configurações](#configurações)
- [Mensagens](#mensagens)
- [Chamadas](#chamadas)
- [Chat](#chat)
- [Etiquetas](#etiquetas)
- [Grupos](#grupos)
- [Integrações - Eventos](#integrações---eventos)
  - [Webhook](#webhook)
  - [Websocket](#websocket)
  - [RabbitMQ](#rabbitmq)
  - [SQS](#sqs)
- [Integrações - Chatbot](#integrações---chatbot)
  - [Chatwoot](#chatwoot)
  - [Typebot](#typebot)

## Configuração

### Inicialização

```javascript
const EvolutionSDK = require('evolution-sdk');
const sdk = new EvolutionSDK(baseUrl, apiKey);
```

### Métodos de Configuração

| Método | Descrição |
|--------|-----------|
| `setBaseUrl(baseUrl)` | Define o URL base da API |
| `setApiKey(apiKey)` | Define a chave de API |
| `getConfig()` | Obtém a configuração atual |
| `getInfo()` | Obtém informações sobre a API |

## Instância

Gerenciamento de instâncias para controlar conexões do WhatsApp.

### Criar Instância

```javascript
await sdk.instance.create({
  instanceName: 'nome-da-instancia',
  qrcode: true,
  integration: 'WHATSAPP-BAILEYS'
});
```

### Parâmetros de Criação

| Parâmetro | Tipo | Descrição | Padrão |
|-----------|------|-----------|--------|
| `instanceName` | string | Nome da instância | (Obrigatório) |
| `token` | string | Token opcional para a instância | (Opcional) |
| `number` | string | Número do WhatsApp | (Opcional) |
| `qrcode` | boolean | Exibir QR Code | true |
| `integration` | string | Tipo de integração | 'WHATSAPP-BAILEYS' |
| `webhook` | object | Configurações do webhook | (Opcional) |
| `rabbitmq` | object | Configurações do RabbitMQ | (Opcional) |
| `sqs` | object | Configurações do SQS | (Opcional) |
| `chatwoot` | object | Configurações do Chatwoot | (Opcional) |

### Métodos de Instância

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `fetchInstances([options])` | Obtém a lista de instâncias | `options`: Opções de filtragem |
| `connect(instanceName, [options])` | Conecta a uma instância | `instanceName`: Nome da instância<br>`options`: Opções adicionais |
| `restart(instanceName)` | Reinicia uma instância | `instanceName`: Nome da instância |
| `setPresence(instanceName, options)` | Define a presença da instância | `instanceName`: Nome da instância<br>`options`: Opções de presença |
| `connectionState(instanceName)` | Obtém o estado de conexão | `instanceName`: Nome da instância |
| `logout(instanceName)` | Desconecta a instância (logout) | `instanceName`: Nome da instância |
| `delete(instanceName)` | Exclui uma instância | `instanceName`: Nome da instância |

## Proxy

Configuração de proxy para instâncias.

### Configurar Proxy

```javascript
await sdk.proxy.set('nome-da-instancia', {
  enabled: true,
  host: 'proxy.exemplo.com',
  port: '8080',
  protocol: 'http',
  username: 'usuario',
  password: 'senha'
});
```

### Métodos de Proxy

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `set(instanceName, options)` | Configura um proxy | `instanceName`: Nome da instância<br>`options`: Configurações do proxy |
| `find(instanceName)` | Obtém as configurações de proxy | `instanceName`: Nome da instância |

## Configurações

Gerenciamento de configurações da instância.

### Definir Configurações

```javascript
await sdk.settings.set('nome-da-instancia', {
  rejectCall: true,
  msgCall: "Estou ocupado agora",
  groupsIgnore: false,
  alwaysOnline: true,
  readMessages: false,
  syncFullHistory: false,
  readStatus: false
});
```

### Métodos de Configurações

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `set(instanceName, options)` | Define as configurações | `instanceName`: Nome da instância<br>`options`: Configurações |
| `find(instanceName)` | Obtém as configurações | `instanceName`: Nome da instância |

## Mensagens

Envio de mensagens de diferentes tipos.

### Métodos de Mensagens

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `sendText(instanceName, options)` | Envia mensagem de texto | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendMedia(instanceName, options)` | Envia mídia (URL/base64) | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendMediaFile(instanceName, formData)` | Envia mídia (arquivo) | `instanceName`: Nome da instância<br>`formData`: Dados do formulário |
| `sendPtv(instanceName, options)` | Envia vídeo PTV | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendPtvFile(instanceName, formData)` | Envia vídeo PTV (arquivo) | `instanceName`: Nome da instância<br>`formData`: Dados do formulário |
| `sendWhatsAppAudio(instanceName, options)` | Envia áudio narrado | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendStatus(instanceName, options)` | Envia status/stories | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendSticker(instanceName, options)` | Envia sticker | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendLocation(instanceName, options)` | Envia localização | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendContact(instanceName, options)` | Envia contatos | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendReaction(instanceName, options)` | Envia reação | `instanceName`: Nome da instância<br>`options`: Opções da reação |
| `sendPoll(instanceName, options)` | Envia enquete | `instanceName`: Nome da instância<br>`options`: Opções da enquete |
| `sendList(instanceName, options)` | Envia lista interativa | `instanceName`: Nome da instância<br>`options`: Opções da lista |
| `sendButtons(instanceName, options)` | Envia botões interativos | `instanceName`: Nome da instância<br>`options`: Opções dos botões |
| `sendTemplate(instanceName, options)` | Envia template (Cloud API) | `instanceName`: Nome da instância<br>`options`: Opções do template |
| `updateBlockStatus(instanceName, options)` | Atualiza status de bloqueio | `instanceName`: Nome da instância<br>`options`: Opções de status |

### Exemplo de Envio de Texto

```javascript
await sdk.message.sendText('nome-da-instancia', {
  number: '5511999999999',
  text: 'Olá, como vai?',
  delay: 1000,
  linkPreview: true
});
```

### Exemplo de Envio de Mídia

```javascript
await sdk.message.sendMedia('nome-da-instancia', {
  number: '5511999999999',
  mediatype: 'image',
  mimetype: 'image/jpeg',
  caption: 'Veja esta imagem!',
  media: 'https://example.com/image.jpg',
  fileName: 'image.jpg'
});
```

### Exemplo de Envio de Botões

```javascript
await sdk.message.sendButtons('nome-da-instancia', {
  number: '5511999999999',
  title: 'Menu de Opções',
  description: 'Escolha uma opção:',
  footer: 'Empresa XYZ',
  buttons: [
    {
      type: 'reply',
      displayText: 'Opção 1',
      id: '1'
    },
    {
      type: 'url',
      displayText: 'Visite nosso site',
      url: 'https://exemplo.com'
    }
  ]
});
```

## Chamadas

Gerenciamento de chamadas.

### Métodos de Chamadas

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `offer(instanceName, options)` | Simula uma chamada | `instanceName`: Nome da instância<br>`options`: Opções da chamada |

### Exemplo de Chamada

```javascript
await sdk.call.offer('nome-da-instancia', {
  number: '5511999999999',
  isVideo: false,
  callDuration: 5
});
```

## Chat

Operações em chats e mensagens.

### Métodos de Chat

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `whatsappNumbers(instanceName, options)` | Verifica números no WhatsApp | `instanceName`: Nome da instância<br>`options`: Lista de números |
| `markMessageAsRead(instanceName, options)` | Marca mensagens como lidas | `instanceName`: Nome da instância<br>`options`: Lista de mensagens |
| `archiveChat(instanceName, options)` | Arquiva/desarquiva um chat | `instanceName`: Nome da instância<br>`options`: Opções de arquivamento |
| `markChatUnread(instanceName, options)` | Marca chat como não lido | `instanceName`: Nome da instância<br>`options`: Opções do chat |
| `deleteMessageForEveryone(instanceName, options)` | Exclui mensagem para todos | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `fetchProfilePictureUrl(instanceName, options)` | Busca URL da foto de perfil | `instanceName`: Nome da instância<br>`options`: Opções do contato |
| `getBase64FromMediaMessage(instanceName, options)` | Obtém mídia em Base64 | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `updateMessage(instanceName, options)` | Atualiza uma mensagem | `instanceName`: Nome da instância<br>`options`: Opções da mensagem |
| `sendPresence(instanceName, options)` | Envia indicação de presença | `instanceName`: Nome da instância<br>`options`: Opções de presença |
| `findContacts(instanceName, [options])` | Busca contatos | `instanceName`: Nome da instância<br>`options`: Filtros de busca |
| `findMessages(instanceName, options)` | Busca mensagens | `instanceName`: Nome da instância<br>`options`: Filtros de busca |
| `findStatusMessage(instanceName, options)` | Busca mensagens de status | `instanceName`: Nome da instância<br>`options`: Filtros de busca |
| `findChats(instanceName)` | Busca chats | `instanceName`: Nome da instância |
| `fetchBusinessProfile(instanceName, options)` | Busca perfil de negócio | `instanceName`: Nome da instância<br>`options`: Opções do contato |
| `fetchProfile(instanceName, options)` | Busca perfil | `instanceName`: Nome da instância<br>`options`: Opções do contato |
| `updateProfileName(instanceName, options)` | Atualiza nome do perfil | `instanceName`: Nome da instância<br>`options`: Novo nome |
| `updateProfileStatus(instanceName, options)` | Atualiza status do perfil | `instanceName`: Nome da instância<br>`options`: Novo status |
| `updateProfilePicture(instanceName, options)` | Atualiza foto do perfil | `instanceName`: Nome da instância<br>`options`: Nova foto |
| `removeProfilePicture(instanceName)` | Remove foto do perfil | `instanceName`: Nome da instância |
| `fetchPrivacySettings(instanceName)` | Busca configurações de privacidade | `instanceName`: Nome da instância |
| `updatePrivacySettings(instanceName, options)` | Atualiza configurações de privacidade | `instanceName`: Nome da instância<br>`options`: Novas configurações |

## Etiquetas

Gerenciamento de etiquetas (labels).

### Métodos de Etiquetas

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `findLabels(instanceName)` | Busca etiquetas disponíveis | `instanceName`: Nome da instância |
| `handleLabel(instanceName, options)` | Gerencia etiquetas | `instanceName`: Nome da instância<br>`options`: Opções da etiqueta |

### Exemplo de Gerenciamento de Etiquetas

```javascript
// Adicionar etiqueta
await sdk.label.handleLabel('nome-da-instancia', {
  number: '5511999999999',
  labelId: 'id-da-etiqueta',
  action: 'add'
});

// Remover etiqueta
await sdk.label.handleLabel('nome-da-instancia', {
  number: '5511999999999',
  labelId: 'id-da-etiqueta',
  action: 'remove'
});
```

## Grupos

Gerenciamento de grupos.

### Métodos de Grupos

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `create(instanceName, options)` | Cria um novo grupo | `instanceName`: Nome da instância<br>`options`: Opções do grupo |
| `updateGroupPicture(instanceName, groupJid, options)` | Atualiza foto do grupo | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo<br>`options`: Nova foto |
| `updateGroupSubject(instanceName, groupJid, options)` | Atualiza nome do grupo | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo<br>`options`: Novo nome |
| `updateGroupDescription(instanceName, groupJid, options)` | Atualiza descrição do grupo | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo<br>`options`: Nova descrição |
| `inviteCode(instanceName, groupJid)` | Obtém código de convite | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo |
| `revokeInviteCode(instanceName, groupJid)` | Revoga código de convite | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo |
| `sendInvite(instanceName, options)` | Envia convite para contatos | `instanceName`: Nome da instância<br>`options`: Opções do convite |
| `inviteInfo(instanceName, inviteCode)` | Busca info de um convite | `instanceName`: Nome da instância<br>`inviteCode`: Código de convite |
| `findGroupInfos(instanceName, groupJid)` | Busca info de um grupo | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo |
| `fetchAllGroups(instanceName, getParticipants)` | Busca todos os grupos | `instanceName`: Nome da instância<br>`getParticipants`: Se deve trazer participantes |
| `participants(instanceName, groupJid)` | Busca participantes | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo |
| `updateParticipant(instanceName, groupJid, options)` | Atualiza participantes | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo<br>`options`: Opções dos participantes |
| `updateSetting(instanceName, groupJid, options)` | Atualiza configurações | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo<br>`options`: Novas configurações |
| `toggleEphemeral(instanceName, groupJid, options)` | Configura mensagens temporárias | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo<br>`options`: Opções de temporização |
| `leaveGroup(instanceName, groupJid)` | Sai do grupo | `instanceName`: Nome da instância<br>`groupJid`: JID do grupo |

### Exemplo de Criação de Grupo

```javascript
await sdk.group.create('nome-da-instancia', {
  subject: 'Meu Novo Grupo',
  description: 'Descrição do grupo',
  participants: [
    '5511999999991',
    '5511999999992'
  ]
});
```

### Exemplo de Gerenciamento de Participantes

```javascript
// Adicionar participantes
await sdk.group.updateParticipant('nome-da-instancia', '123456789-group@g.us', {
  action: 'add',
  participants: [
    '5511999999993',
    '5511999999994'
  ]
});

// Remover participantes
await sdk.group.updateParticipant('nome-da-instancia', '123456789-group@g.us', {
  action: 'remove',
  participants: [
    '5511999999995'
  ]
});

// Promover a admin
await sdk.group.updateParticipant('nome-da-instancia', '123456789-group@g.us', {
  action: 'promote',
  participants: [
    '5511999999996'
  ]
});
```

## Integrações - Eventos

### Webhook

Configuração de webhook para receber eventos.

#### Métodos de Webhook

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `set(instanceName, options)` | Configura o webhook | `instanceName`: Nome da instância<br>`options`: Configurações do webhook |
| `find(instanceName)` | Busca a configuração atual | `instanceName`: Nome da instância |

#### Exemplo de Configuração de Webhook

```javascript
await sdk.integrations.events.webhook.set('nome-da-instancia', {
  webhook: {
    enabled: true,
    url: 'https://seu-webhook.com/callback',
    headers: {
      'Authorization': 'Bearer seu-token'
    },
    byEvents: false,
    base64: false,
    events: [
      'MESSAGES_UPSERT',
      'MESSAGES_UPDATE',
      'SEND_MESSAGE'
    ]
  }
});
```

### Websocket

Configuração de websocket para receber eventos em tempo real.

#### Métodos de Websocket

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `set(instanceName, options)` | Configura o websocket | `instanceName`: Nome da instância<br>`options`: Configurações do websocket |
| `find(instanceName)` | Busca a configuração atual | `instanceName`: Nome da instância |

#### Exemplo de Configuração de Websocket

```javascript
await sdk.integrations.events.websocket.set('nome-da-instancia', {
  websocket: {
    enabled: true,
    events: [
      'MESSAGES_UPSERT',
      'MESSAGES_UPDATE',
      'SEND_MESSAGE'
    ]
  }
});
```

### RabbitMQ

Configuração de RabbitMQ para processamento de eventos.

#### Métodos de RabbitMQ

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `set(instanceName, options)` | Configura o RabbitMQ | `instanceName`: Nome da instância<br>`options`: Configurações do RabbitMQ |
| `find(instanceName)` | Busca a configuração atual | `instanceName`: Nome da instância |

#### Exemplo de Configuração de RabbitMQ

```javascript
await sdk.integrations.events.rabbitmq.set('nome-da-instancia', {
  rabbitmq: {
    enabled: true,
    events: [
      'MESSAGES_UPSERT',
      'MESSAGES_UPDATE',
      'SEND_MESSAGE'
    ]
  }
});
```

### SQS

Configuração de AWS SQS para processamento de eventos.

#### Métodos de SQS

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `set(instanceName, options)` | Configura o SQS | `instanceName`: Nome da instância<br>`options`: Configurações do SQS |
| `find(instanceName)` | Busca a configuração atual | `instanceName`: Nome da instância |

#### Exemplo de Configuração de SQS

```javascript
await sdk.integrations.events.sqs.set('nome-da-instancia', {
  sqs: {
    enabled: true,
    events: [
      'MESSAGES_UPSERT',
      'MESSAGES_UPDATE',
      'SEND_MESSAGE'
    ]
  }
});
```

## Integrações - Chatbot

### Chatwoot

Integração com Chatwoot para gerenciamento de atendimento.

#### Métodos do Chatwoot

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `set(instanceName, options)` | Configura o Chatwoot | `instanceName`: Nome da instância<br>`options`: Configurações do Chatwoot |
| `find(instanceName)` | Busca a configuração atual | `instanceName`: Nome da instância |

#### Exemplo de Configuração do Chatwoot

```javascript
await sdk.integrations.chatbot.chatwoot.set('nome-da-instancia', {
  enabled: true,
  accountId: '1',
  token: 'sua-token-chatwoot',
  url: 'https://chatwoot.exemplo.com',
  signMsg: true,
  reopenConversation: true,
  nameInbox: 'whatsapp',
  importContacts: true,
  importMessages: true,
  daysLimitImportMessages: 2
});
```

### Typebot

Integração com Typebot para chatbots e fluxos automáticos.

#### Métodos do Typebot

| Método | Descrição | Parâmetros |
|--------|-----------|------------|
| `changeStatus(instanceName, options)` | Altera status de uma sessão | `instanceName`: Nome da instância<br>`options`: Opções de status |
| `fetchSessions(instanceName, typebotId)` | Busca sessões de um fluxo | `instanceName`: Nome da instância<br>`typebotId`: ID do fluxo |
| `setSettings(instanceName, options)` | Configura o Typebot | `instanceName`: Nome da instância<br>`options`: Configurações do Typebot |
| `fetchSettings(instanceName)` | Busca configurações do Typebot | `instanceName`: Nome da instância |
| `create(instanceName, options)` | Cria um novo fluxo | `instanceName`: Nome da instância<br>`options`: Opções do fluxo |
| `find(instanceName)` | Busca todos os fluxos | `instanceName`: Nome da instância |
| `fetch(instanceName, typebotId)` | Busca um fluxo específico | `instanceName`: Nome da instância<br>`typebotId`: ID do fluxo |
| `update(instanceName, typebotId, options)` | Atualiza um fluxo | `instanceName`: Nome da instância<br>`typebotId`: ID do fluxo<br>`options`: Novas opções |
| `delete(instanceName, typebotId)` | Remove um fluxo | `instanceName`: Nome da instância<br>`typebotId`: ID do fluxo |
| `start(instanceName, options)` | Inicia um fluxo manualmente | `instanceName`: Nome da instância<br>`options`: Opções de início |

#### Exemplo de Configuração do Typebot

```javascript
// Criar fluxo
await sdk.integrations.chatbot.typebot.create('nome-da-instancia', {
  enabled: true,
  url: 'https://typebot.io',
  typebot: 'meu-fluxo',
  triggerType: 'keyword',
  triggerOperator: 'equals',
  triggerValue: 'atendimento',
  expire: 30,
  keywordFinish: '#SAIR'
});

// Iniciar fluxo manualmente
await sdk.integrations.chatbot.typebot.start('nome-da-instancia', {
  url: 'https://typebot.io',
  typebot: 'meu-fluxo',
  remoteJid: '5511999999999@s.whatsapp.net',
  variables: [
    {
      name: 'nome',
      value: 'João'
    }
  ]
});
```

---

Esta referência cobre as principais funcionalidades do Evolution SDK. Para mais detalhes sobre parâmetros específicos e comportamentos, consulte os exemplos de código e a documentação adicional.
