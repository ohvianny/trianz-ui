# TrianzUi

#RUN IN UBUNTU
docker build -t root/trianz-ui .

docker run --name tu -idt -v ${PWD}:/src -v /src/node_modules -p 4200:4200 root/trianz-ui

#se queda sin memoria
docker system prune
sudo systemctl enable docker