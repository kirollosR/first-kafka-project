## To add topic

docker-compose exec kafka kafka-topics --create \  --topic test \  --partitions 1 \  --replication-factor 1 \  --bootstrap-server localhost:9092

# Create a kafka topic
docker exec -it <KAFKA_CONTAINER_NAME> /usr/bin/kafka-topics --create --topic <TOPIC_NAME> --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

# List created topics 
docker exec -it <KAFKA_CONTAINER_NAME> /usr/bin/kafka-topics --list --bootstrap-server localhost:9092