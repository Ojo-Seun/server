FROM node:16-alpine as development

WORKDIR /server
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install
RUN npm install -D
COPY . .
RUN npm run build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG JWT_SECRET=@flyhighTokenSecret2022=PASSWORD
ENV JWT_SECRET=${JWT_SECRET}
ARG ATLAS_URL=mongodb+srv://OJO_SEUN:B6koWdZbJp958rRX@cluster0.gzwt7.mongodb.net/?retryWrites=true&w=majority
ENV ATLAS_URL=${ATLAS_URL}
EXPOSE 5000

CMD ["node", "build/index.js"]
