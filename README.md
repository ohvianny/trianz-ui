# TrianzUi

#RUN IN UBUNTU
docker build -t root/trianz-ui .

docker run --name t-ui -idt -v ${PWD}:/src -v /src/node_modules -p 4200:4200 root/trianz-ui