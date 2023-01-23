FROM node

WORKDIR /src

COPY package.json /src

RUN npm install

COPY . .



EXPOSE 3000

CMD ["node", "index.tsx" ]
