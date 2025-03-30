const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'] // Use the external port mapped in docker-compose
})

module.exports = kafka