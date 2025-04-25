/**
 * Exemplo avançado: Automação de fluxos de atendimento
 * 
 * Este exemplo demonstra como criar um sistema simples de fluxos
 * de atendimento automático usando a Evolution API.
 */

const EvolutionSDK = require('../index');

// Configurar o SDK
const sdk = new EvolutionSDK('https://sua-api.exemplo.com', 'sua-api-key');

// ID da instância
const instanceName = 'minha-instancia';

// Definição dos fluxos de atendimento
const flows = {
  start: {
    message: "Olá! Bem-vindo ao nosso atendimento automático. Como posso ajudar?\n\n1 - Informações sobre produtos\n2 - Suporte técnico\n3 - Falar com um atendente",
    options: {
      "1": "products",
      "2": "support",
      "3": "human"
    }
  },
  products: {
    message: "Qual produto você gostaria de saber mais?\n\n1 - Produto A\n2 - Produto B\n3 - Produto C\n0 - Voltar ao menu principal",
    options: {
      "1": "productA",
      "2": "productB",
      "3": "productC",
      "0": "start"
    }
  },
  productA: {
    message: "O Produto A é nossa solução premium para empresas. Custa R$ 1.999,00 e inclui suporte 24/7.\n\n0 - Voltar ao menu de produtos",
    options: {
      "0": "products"
    }
  },
  productB: {
    message: "O Produto B é ideal para pequenas empresas. Custa R$ 999,00 e inclui suporte em horário comercial.\n\n0 - Voltar ao menu de produtos",
    options: {
      "0": "products"
    }
  },
  productC: {
    message: "O Produto C é nossa solução básica. Custa R$ 499,00 e inclui suporte por e-mail.\n\n0 - Voltar ao menu de produtos",
    options: {
      "0": "products"
    }
  },
  support: {
    message: "Qual o problema que você está enfrentando?\n\n1 - Instalação\n2 - Configuração\n3 - Erros no sistema\n0 - Voltar ao menu principal",
    options: {
      "1": "installSupport",
      "2": "configSupport",
      "3": "errorSupport",
      "0": "start"
    }
  },
  installSupport: {
    message: "Para problemas de instalação, recomendamos seguir nosso guia em: https://exemplo.com/guia-instalacao\n\nSe o problema persistir, envie um e-mail para suporte@exemplo.com\n\n0 - Voltar ao menu de suporte",
    options: {
      "0": "support"
    }
  },
  configSupport: {
    message: "Para problemas de configuração, consulte nossa documentação em: https://exemplo.com/configuracao\n\nOu assista nosso vídeo tutorial: https://exemplo.com/video-tutorial\n\n0 - Voltar ao menu de suporte",
    options: {
      "0": "support"
    }
  },
  errorSupport: {
    message: "Para erros no sistema, por favor envie um screenshot do erro para suporte@exemplo.com ou contate-nos pelo telefone (11) 5555-5555.\n\n0 - Voltar ao menu de suporte",
    options: {
      "0": "support"
    }
  },
  human: {
    message: "Entendi que você precisa falar com um atendente humano. Um de nossos atendentes entrará em contato em breve. Seu número de protocolo é #{PROTOCOL}. Obrigado pela paciência!",
    options: {}
  }
};

// Armazenamento de sessões ativas
const sessions = {};

// Gerar número de protocolo aleatório
function generateProtocol() {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

// Processar mensagem recebida
async function processMessage(remoteJid, message) {
  // Verificar se já existe uma sessão para este contato
  if (!sessions[remoteJid]) {
    // Iniciar nova sessão
    sessions[remoteJid] = {
      currentFlow: 'start',
      history: []
    };
  }

  const session = sessions[remoteJid];
  
  // Registrar mensagem no histórico
  session.history.push({
    timestamp: new Date(),
    message: message
  });

  // Obter o fluxo atual
  const currentFlow = flows[session.currentFlow];

  // Verificar se a mensagem é uma opção válida
  if (currentFlow.options[message]) {
    // Atualizar o fluxo atual
    session.currentFlow = currentFlow.options[message];
    
    // Obter o novo fluxo
    const newFlow = flows[session.currentFlow];
    
    // Preparar a mensagem
    let responseMessage = newFlow.message;
    
    // Substituir placeholders
    if (responseMessage.includes('#{PROTOCOL}')) {
      responseMessage = responseMessage.replace('#{PROTOCOL}', generateProtocol());
    }
    
    // Enviar a mensagem
    await sdk.message.sendText(instanceName, {
      number: remoteJid.replace('@s.whatsapp.net', ''),
      text: responseMessage
    });
    
    // Se for fluxo final sem opções, encerrar a sessão após um tempo
    if (Object.keys(newFlow.options).length === 0) {
      setTimeout(() => {
        delete sessions[remoteJid];
        console.log(`Sessão encerrada para ${remoteJid}`);
      }, 60000); // 1 minuto
    }
  } else {
    // Resposta inválida
    await sdk.message.sendText(instanceName, {
      number: remoteJid.replace('@s.whatsapp.net', ''),
      text: "Desculpe, não entendi sua resposta. Por favor, selecione uma das opções disponíveis."
    });
    
    // Reenviar as opções do fluxo atual
    setTimeout(async () => {
      await sdk.message.sendText(instanceName, {
        number: remoteJid.replace('@s.whatsapp.net', ''),
        text: currentFlow.message
      });
    }, 1000);
  }
}

// Função principal
async function main() {
  try {
    // Verificar se a instância já existe
    const instances = await sdk.instance.fetchInstances();
    let instanceExists = false;
    
    for (const instance of instances) {
      if (instance.instance.instanceName === instanceName) {
        instanceExists = true;
        break;
      }
    }
    
    // Se a instância não existir, criar uma nova
    if (!instanceExists) {
      console.log(`Criando instância ${instanceName}...`);
      const instance = await sdk.instance.create({
        instanceName: instanceName,
        qrcode: true
      });
      
      // Exibir QR Code para escaneamento
      if (instance.qrcode && instance.qrcode.base64) {
        console.log('Escaneie o QR Code:');
        console.log(instance.qrcode.base64);
      }
    } else {
      console.log(`Instância ${instanceName} já existe.`);
      
      // Reconectar
      const connection = await sdk.instance.connect(instanceName);
      console.log('Status de conexão:', connection);
    }
    
    // Configurar webhook para receber mensagens
    console.log('Configurando webhook...');
    await sdk.integrations.events.webhook.set(instanceName, {
      webhook: {
        enabled: true,
        url: 'https://seu-webhook.com/callback',
        headers: {
          'Authorization': 'Bearer TOKEN'
        },
        events: ['MESSAGES_UPSERT']
      }
    });
    
    console.log('Sistema de fluxos inicializado com sucesso!');
    console.log('Aguardando mensagens...');
    
    // Simulação de recebimento de mensagem via webhook
    // Na implementação real, você processaria mensagens recebidas no seu servidor webhook
    
    // Exemplo de processamento simulado
    setTimeout(async () => {
      console.log('Simulando mensagem recebida...');
      await processMessage('5511999999999@s.whatsapp.net', '1');
      
      setTimeout(async () => {
        await processMessage('5511999999999@s.whatsapp.net', '2');
        
        setTimeout(async () => {
          await processMessage('5511999999999@s.whatsapp.net', '1');
        }, 3000);
      }, 3000);
    }, 5000);
    
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Executar
main();