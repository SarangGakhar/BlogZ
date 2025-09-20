    #  specify docker image 

# FROM alpine
FROM node:alpine

# copy the files inside the directory usr/app
WORKDIR /app
COPY ./package.json ./

#  Install some dependencies
RUN npm install

COPY ./ ./
#  default command 

CMD ["npm","start"]

# to build the image use -  "docker build -t sarang/simpleweb ."
# to run the image - docker run sarang/simpleweb
# to run the image with port mapping- "docker run -p reqPort:PortInsideConatiner sarang/simpleweb"
# "docker run -p 8080:8080 sarang/simpleweb"