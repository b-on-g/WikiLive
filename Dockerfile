FROM node:20-alpine

RUN apk add --no-cache git

WORKDIR /mam
RUN mkdir -p /mam/bog/WikiLive
COPY . /mam/bog/WikiLive

RUN npm exec mam /bog/WikiLive

EXPOSE 9080

# http://localhost:9080/bog/WikiLive/app/-/test.html
