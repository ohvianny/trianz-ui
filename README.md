#DOCKER 

docker build -t vimp/trianz-ui:1.3 .
docker push vimp/trianz-ui:1.3
docker run --name tu -idt -v ${PWD}:/usr/src/app/dist/trianz-ui -p 80:80 vimp/trianz-ui:1.3