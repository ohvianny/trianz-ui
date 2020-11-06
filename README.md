# TrianzUi

#RUN IN UBUNTU
docker build -t root/trianz-ui .

docker run --name tu -idt -v ${PWD}:/src -v /src/node_modules -p 4200:4200 root/trianz-ui

docker run --name tu2 -idt -v ${PWD}:/usr/src/app/dist/trianz-ui -p 80:4200 root/trianz-ui

#se queda sin memoria
docker system prune
sudo systemctl enable docker



docker run --name tu2 -idt -v ${PWD}:/usr/src/app/dist/trianz-ui -p 80:80 root/trianz-ui