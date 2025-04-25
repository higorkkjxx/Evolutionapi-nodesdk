/**
 * Exemplo: Múltiplas instâncias com proxy
 * 
 * Este exemplo demonstra como gerenciar múltiplas instâncias
 * utilizando proxies diferentes para cada uma.
 */

const EvolutionSDK = require('../index');

// Configurar o SDK
const sdk = new EvolutionSDK('https://sua-api.exemplo.com', 'sua-api-key');

// Lista de instâncias e proxies
const instances = [
  {
    name: 'instance1',
    proxy: {
      enabled: true,
      host: '10.0.0.1',
      port: '8080',
      protocol: 'http',
      username: 'user1',
      password: 'pass1'
    }
  },
  {
    name: 'instance2',
    proxy: {
      enabled: true,
      host: '10.0.0.2',
      port: '8080',
      protocol: 'http',
      username: 'user2',
      password: 'pass2'
    }
  },
  {
    name: 'instance3',
    proxy: {
      enabled: true,
      host: '10.0.0.3',
      port: '8080',
      protocol: 'http',
      username: 'user3',
      password: 'pass3'
    }
  }
];

// Objeto para armazenar QR Codes
const qrCodes = {};

// Função para criar e configurar uma instância
async function setupInstance(instance) {
  try {
    console.log(`Configurando instância ${instance.name}...`);
    
    // Verificar se a instância já existe
    const instanceList = await sdk.instance.fetchInstances();
    let exists = instanceList.some(i => i.instance.instanceName === instance.name);
    
    if (!exists) {
      // Criar nova instância
      console.log(`Criando instância ${instance.name}...`);
      const result = await sdk.instance.create({
        instanceName: instance.name,
        qrcode: true
      });
      
      // Salvar QR Code para escaneamento posterior
      if (result.qrcode && result.qrcode.base64) {
        qrCodes[instance.name] = result.qrcode.base64;
      }
    } else {
      console.log(`Instância ${instance.name} já existe.`);
    }
    
    // Configurar o proxy
    console.log(`Configurando proxy para ${instance.name}...`);
    await sdk.proxy.set(instance.name, instance.proxy);
    
    // Configurar as configurações da instância
    console.log(`Definindo configurações para ${instance.name}...`);
    await sdk.settings.set(instance.name, {
      rejectCall: true,
      msgCall: "Não posso atender chamadas no momento.",
      groupsIgnore: true,
      alwaysOnline: true,
      readMessages: false,
      syncFullHistory: false
    });
    
    return true;
  } catch (error) {
    console.error(`Erro ao configurar instância ${instance.name}:`, error.message);
    return false;
  }
}

// Função para verificar o status de uma instância
async function checkInstanceStatus(instanceName) {
  try {
    const status = await sdk.instance.connectionState(instanceName);
    console.log(`Status da instância ${instanceName}:`, status.state);
    return status.state;
  } catch (error) {
    console.error(`Erro ao verificar status da instância ${instanceName}:`, error.message);
    return null;
  }
}

// Função para enviar mensagem de teste de uma instância
async function sendTestMessage(instanceName, number, message) {
  try {
    console.log(`Enviando mensagem de teste da instância ${instanceName} para ${number}...`);
    await sdk.message.sendText(instanceName, {
      number: number,
      text: message
    });
    console.log(`Mensagem enviada com sucesso da instância ${instanceName}`);
    return true;
  } catch (error) {
    console.error(`Erro ao enviar mensagem da instância ${instanceName}:`, error.message);
    return false;
  }
}

// Função para balancear o envio de mensagens entre instâncias
function getNextInstance(instances, currentIndex = -1) {
  if (currentIndex >= instances.length - 1) {
    return 0;
  } else {
    return currentIndex + 1;
  }
}

// Função principal
async function main() {
  try {
    // Configurar todas as instâncias
    console.log("Configurando instâncias...");
    for (const instance of instances) {
      await setupInstance(instance);
    }
    
    // Exibir QR Codes para escaneamento
    console.log("\nQR Codes para escaneamento:");
    for (const [instanceName, qrCode] of Object.entries(qrCodes)) {
      console.log(`\nQR Code para a instância ${instanceName}:`);
      console.log(qrCode);
    }
    
    // Verificar status de todas as instâncias após um tempo
    console.log("\nAguardando conexão...");
    setTimeout(async () => {
      const connectedInstances = [];
      
      for (const instance of instances) {
        const status = await checkInstanceStatus(instance.name);
        if (status === 'open') {
          connectedInstances.push(instance.name);
        }
      }
      
      console.log(`\nInstâncias conectadas: ${connectedInstances.length} de ${instances.length}`);
      
      // Se tiver instâncias conectadas, enviar mensagens de teste
      if (connectedInstances.length > 0) {
        console.log("\nEnviando mensagens de teste com balanceamento de carga...");
        
        const numbers = [
          '5511999999991',
          '5511999999992',
          '5511999999993',
          '5511999999994',
          '5511999999995'
        ];
        
        let currentInstanceIndex = -1;
        
        for (const number of numbers) {
          currentInstanceIndex = getNextInstance(connectedInstances, currentInstanceIndex);
          const instanceName = connectedInstances[currentInstanceIndex];
          
          await sendTestMessage(
            instanceName, 
            number, 
            `Olá! Esta é uma mensagem de teste enviada da instância ${instanceName}`
          );
          
          // Aguardar um tempo entre envios
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log("\nProcesso de teste concluído!");
      } else {
        console.log("\nNenhuma instância conectada. Por favor, escaneie os QR Codes.");
      }
    }, 20000); // Aguardar 20 segundos
    
  } catch (error) {
    console.error('Erro geral:', error.message);
  }
}

// Executar
main();