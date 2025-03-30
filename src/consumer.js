console.log('Consumer code is running...')

const kafka = require('./kafka-config')

const consumer = kafka.consumer({ groupId: 'test-group' })

const runConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'test', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
        partition,
        offset: message.offset
      })
    }
  })
}

runConsumer().catch(console.error)

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  await consumer.disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await consumer.disconnect()
  process.exit(0)
})