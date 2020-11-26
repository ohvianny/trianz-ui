#DOCKER 

docker build -t vimp/trianz-ui .

docker run --name tu -idt -v ${PWD}:/usr/src/app/dist/trianz-ui -p 80:80 vimp/trianz-ui:0.13