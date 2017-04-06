# Update this with your app settings
CONTAINER_NAME=recursos-mongodb

docker inspect $CONTAINER_NAME
echo "mongodb: "
docker inspect $CONTAINER_NAME | grep IPAddress