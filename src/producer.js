console.log('Producer code is running...');

const kafka = require('./kafka-config');
const readline = require('readline');

const producer = kafka.producer();

// Create interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const runProducer = async () => {
  await producer.connect();
  console.log('Producer connected. Type your messages (press Ctrl+C to exit):');
  
  // Function to send a single message
  const sendMessage = async (message) => {
    try {
      await producer.send({
        topic: 'test',
        messages: [{ value: message }]
      });
      console.log(`Sent: ${message}`);
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  // Prompt user for input in a loop
  const promptUser = () => {
    rl.question('Enter message to send (or "exit" to quit): ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        await shutdown();
        return;
      }
      
      await sendMessage(input);
      promptUser(); // Continue prompting
    });
  };

  promptUser();
};

// Graceful shutdown
const shutdown = async () => {
  console.log('\nDisconnecting producer...');
  await producer.disconnect();
  rl.close();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

runProducer().catch(console.error);