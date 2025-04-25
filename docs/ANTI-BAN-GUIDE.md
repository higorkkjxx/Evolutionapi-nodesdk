# Guia Anti-Banimento para o Evolution SDK

O WhatsApp tem políticas rigorosas contra automação, o que pode levar ao banimento de números se não forem tomados os devidos cuidados. Este guia apresenta as melhores práticas para minimizar o risco de banimento ao utilizar o Evolution SDK.

## Entendendo os Riscos

O WhatsApp pode banir números por diversas razões:

- Envio de mensagens em massa sem interação do usuário
- Alto volume de mensagens em pouco tempo
- Padrões de mensagens muito similares
- Uso excessivo de mídias/arquivos
- Criação e adição a grupos em massa
- Uso da mesma conta em múltiplos dispositivos/IPs simultaneamente
- Reportes de spam por parte dos usuários
- Violações dos Termos de Serviço do WhatsApp

## Configurações Recomendadas

O Evolution SDK oferece várias configurações que podem ajudar a reduzir o risco de banimento:

### 1. Configurar Proxy

```javascript
// Configurar um proxy único por instância
await sdk.proxy.set('minha-instancia', {
  enabled: true,
  host: 'seu-proxy.com',
  port: '8080',
  protocol: 'http', // http, https, socks
  username: 'usuario', // se necessário
  password: 'senha'    // se necessário
});
```

### 2. Ajustar Configurações da Instância

```javascript
// Configurações recomendadas para parecer um usuário real
await sdk.settings.set('minha-instancia', {
  rejectCall: true,               // Rejeitar chamadas automaticamente
  msgCall: "Estou ocupado agora", // Mensagem para chamadas rejeitadas
  groupsIgnore: false,            // Não ignorar grupos
  alwaysOnline: false,            // Não manter sempre online (parece mais natural)
  readMessages: true,             // Marcar mensagens como lidas
  readStatus: true,               // Marcar status como vistos
  syncFullHistory: false          // Não sincronizar histórico completo
});
```

### 3. Adicionar Atrasos Naturais

```javascript
// Adicionar atrasos entre mensagens
async function sendMessagesWithDelay(instanceName, numbers, message) {
  for (const number of numbers) {
    // Enviar a mensagem
    await sdk.message.sendText(instanceName, {
      number: number,
      text: message,
      // Adicionar um delay de 2-5 segundos
      delay: 2000 + Math.floor(Math.random() * 3000)
    });
    
    // Adicionar um intervalo entre envios (10-30 segundos)
    const randomDelay = 10000 + Math.floor(Math.random() * 20000);
    await new Promise(resolve => setTimeout(resolve, randomDelay));
    
    // Simular digitação antes de enviar (opcional)
    await sdk.chat.sendPresence(instanceName, {
      number: number,
      presence: 'composing',
      delay: 3000 + Math.floor(Math.random() * 5000)
    });
  }
}
```

### 4. Variar Conteúdo das Mensagens

```javascript
// Função para variar as mensagens
function getVariedMessage(name) {
  const greetings = [
    "Olá",
    "Oi",
    "Bom dia",
    "Boa tarde",
    "Boa noite",
    "E aí"
  ];
  
  const messages = [
    "Tudo bem com você?",
    "Como você está?",
    "Espero que esteja bem.",
    "Como têm passado?",
    "Como vão as coisas?"
  ];
  
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  const message = messages[Math.floor(Math.random() * messages.length)];
  
  return `${greeting} ${name}! ${message}`;
}

// Uso
await sdk.message.sendText(instanceName, {
  number: '5511999999999',
  text: getVariedMessage("Carlos")
});
```

### 5. Limitar Volume de Mensagens

```javascript
// Limitador de mensagens por dia
class MessageLimiter {
  constructor(dailyLimit = 100) {
    this.dailyLimit = dailyLimit;
    this.messageCount = 0;
    this.resetDate = new Date();
    this.resetCount();
  }
  
  resetCount() {
    // Resetar contagem à meia-noite
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilReset = tomorrow.getTime() - now.getTime();
    setTimeout(() => {
      this.messageCount = 0;
      this.resetCount();
    }, timeUntilReset);
  }
  
  async sendMessage(sdk, instanceName, number, text) {
    if (this.messageCount >= this.dailyLimit) {
      console.log(`Limite diário de ${this.dailyLimit} mensagens atingido. Aguarde até amanhã.`);
      return false;
    }
    
    try {
      await sdk.message.sendText(instanceName, { number, text });
      this.messageCount++;
      return true;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.message);
      return false;
    }
  }
}

// Uso
const limiter = new MessageLimiter(150); // Limite de 150 mensagens por dia
await limiter.sendMessage(sdk, 'minha-instancia', '5511999999999', 'Olá!');
```

### 6. Gerenciar Múltiplas Instâncias

```javascript
// Classe para gerenciar múltiplas instâncias
class InstanceManager {
  constructor(sdk, maxMessagesPerInstance = 50) {
    this.sdk = sdk;
    this.instances = [];
    this.currentIndex = 0;
    this.messageCounts = {};
    this.maxMessagesPerInstance = maxMessagesPerInstance;
  }
  
  async addInstance(instanceName) {
    this.instances.push(instanceName);
    this.messageCounts[instanceName] = 0;
  }
  
  async sendMessage(number, text) {
    if (this.instances.length === 0) {
      throw new Error('Nenhuma instância disponível');
    }
    
    // Encontra a próxima instância disponível
    let instancesChecked = 0;
    while (instancesChecked < this.instances.length) {
      const instanceName = this.instances[this.currentIndex];
      
      // Verificar se a instância atingiu o limite
      if (this.messageCounts[instanceName] < this.maxMessagesPerInstance) {
        try {
          // Enviar mensagem
          await this.sdk.message.sendText(instanceName, { number, text });
          this.messageCounts[instanceName]++;
          
          // Avançar para a próxima instância
          this.currentIndex = (this.currentIndex + 1) % this.instances.length;
          return { success: true, instanceName };
        } catch (error) {
          // Avançar para a próxima instância em caso de erro
          this.currentIndex = (this.currentIndex + 1) % this.instances.length;
          instancesChecked++;
        }
      } else {
        // Avançar para a próxima instância
        this.currentIndex = (this.currentIndex + 1) % this.instances.length;
        instancesChecked++;
      }
    }
    
    throw new Error('Todas as instâncias atingiram o limite de mensagens');
  }
  
  // Resetar contadores a cada dia
  resetCounts() {
    for (const instanceName of this.instances) {
      this.messageCounts[instanceName] = 0;
    }
  }
}

// Uso
const manager = new InstanceManager(sdk, 50);
await manager.addInstance('instance1');
await manager.addInstance('instance2');
await manager.sendMessage('5511999999999', 'Olá!');
```

## Estratégias de Número

### 1. Esquenta de Número

Antes de utilizar um número para automação, é recomendado "esquentá-lo":

```javascript
async function warmUpNumber(instanceName, contacts) {
  console.log(`Iniciando processo de esquentar o número da instância ${instanceName}...`);
  
  // 1. Adicionar contatos manualmente (um por um)
  for (const contact of contacts) {
    try {
      // Verificar se o número está no WhatsApp
      const result = await sdk.chat.whatsappNumbers(instanceName, {
        numbers: [contact]
      });
      
      if (result.exists) {
        console.log(`O número ${contact} está no WhatsApp.`);
        
        // Aguardar um tempo aleatório entre 5-15 minutos
        const waitTime = 300000 + Math.floor(Math.random() * 600000);
        console.log(`Aguardando ${Math.floor(waitTime/60000)} minutos...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // Enviar uma mensagem personalizada
        const message = `Olá! Estou adicionando novos contatos. Este é meu novo número de WhatsApp.`;
        await sdk.message.sendText(instanceName, {
          number: contact,
          text: message
        });
        
        console.log(`Mensagem enviada para ${contact}.`);
        
        // Aguardar mais um tempo aleatório entre 20-40 minutos
        const waitTime2 = 1200000 + Math.floor(Math.random() * 1200000);
        console.log(`Aguardando ${Math.floor(waitTime2/60000)} minutos...`);
        await new Promise(resolve => setTimeout(resolve, waitTime2));
      }
    } catch (error) {
      console.error(`Erro ao processar contato ${contact}:`, error.message);
    }
  }
  
  console.log(`Processo de esquentar o número concluído.`);
}

// Usar a função
const contacts = [
  '5511999999991',
  '5511999999992',
  '5511999999993'
  // Adicione mais números de contatos conhecidos
];
warmUpNumber('minha-instancia', contacts);
```

### 2. Rodízio de Números

Implementar um sistema de rodízio de números para distribuir o volume de mensagens:

```javascript
class NumberRotation {
  constructor(sdk, instances) {
    this.sdk = sdk;
    this.instances = instances;
    this.currentIndex = 0;
    this.dailyCounters = {};
    
    // Inicializar contadores
    for (const instance of instances) {
      this.dailyCounters[instance] = 0;
    }
    
    // Configurar reset diário
    this.setupDailyReset();
  }
  
  setupDailyReset() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilReset = tomorrow.getTime() - now.getTime();
    setTimeout(() => {
      for (const instance of this.instances) {
        this.dailyCounters[instance] = 0;
      }
      this.setupDailyReset();
    }, timeUntilReset);
  }
  
  async sendMessage(number, text, maxMessagesPerInstance = 50) {
    // Encontrar próxima instância disponível
    let instanceFound = false;
    let startIndex = this.currentIndex;
    
    do {
      const instanceName = this.instances[this.currentIndex];
      
      // Verificar se a instância está abaixo do limite
      if (this.dailyCounters[instanceName] < maxMessagesPerInstance) {
        // Verificar status da conexão
        const status = await this.sdk.instance.connectionState(instanceName);
        
        if (status.state === 'open') {
          // Enviar mensagem
          await this.sdk.message.sendText(instanceName, { number, text });
          
          // Atualizar contador
          this.dailyCounters[instanceName]++;
          
          // Avançar para a próxima instância
          this.currentIndex = (this.currentIndex + 1) % this.instances.length;
          
          console.log(`Mensagem enviada para ${number} usando a instância ${instanceName}`);
          return { success: true, instanceName };
        }
      }
      
      // Passar para a próxima instância
      this.currentIndex = (this.currentIndex + 1) % this.instances.length;
      
      // Verificar se já testamos todas as instâncias
      if (this.currentIndex === startIndex) {
        break;
      }
      
    } while (!instanceFound);
    
    throw new Error('Não há instâncias disponíveis para envio de mensagens');
  }
}

// Uso
const rotation = new NumberRotation(sdk, ['instance1', 'instance2', 'instance3']);
await rotation.sendMessage('5511999999999', 'Olá!', 50);
```

## Monitoramento e Detecção de Banimento

```javascript
async function checkBanStatus(instanceName) {
  try {
    const status = await sdk.instance.connectionState(instanceName);
    
    if (status.state === 'open') {
      console.log(`Instância ${instanceName} está conectada.`);
      return true;
    } else if (status.state === 'connecting') {
      console.log(`Instância ${instanceName} está tentando reconectar...`);
      return false;
    } else if (status.state === 'close') {
      // Verificar razão do fechamento
      if (status.statusReason === 401) {
        console.log(`ALERTA: Instância ${instanceName} pode estar banida!`);
        
        // Tentar reconectar
        try {
          await sdk.instance.connect(instanceName);
          console.log(`Tentativa de reconexão da instância ${instanceName}.`);
        } catch (reconnectError) {
          console.error(`Falha ao reconectar ${instanceName}:`, reconnectError.message);
        }
        
        return false;
      } else {
        console.log(`Instância ${instanceName} está desconectada.`);
        return false;
      }
    }
  } catch (error) {
    console.error(`Erro ao verificar status da instância ${instanceName}:`, error.message);
    return false;
  }
}

// Monitoramento periódico
function setupBanMonitoring(instances, interval = 15 * 60 * 1000) {
  setInterval(async () => {
    for (const instance of instances) {
      await checkBanStatus(instance);
    }
  }, interval); // A cada 15 minutos por padrão
}

// Uso
setupBanMonitoring(['instance1', 'instance2', 'instance3']);
```

## Conclusão

Seguindo estas práticas, você pode reduzir significativamente o risco de banimento ao utilizar o Evolution SDK para automação de WhatsApp. Lembre-se de que o WhatsApp é projetado principalmente para comunicação pessoal, e qualquer tipo de automação deve ser feito com moderação e responsabilidade.

Recomendações finais:

1. Comece com volumes baixos e aumente gradualmente
2. Use números verificados com histórico de uso normal
3. Mantenha interações humanizadas (tempos variáveis, mensagens diversificadas)
4. Respeite os limites de uso do WhatsApp
5. Monitore constantemente o status das suas instâncias
6. Implemente um sistema de rodízio de números
7. Configure proxies únicos para cada instância

Seguindo este guia, você poderá aproveitar os recursos do Evolution SDK minimizando o risco de banimento dos seus números.
