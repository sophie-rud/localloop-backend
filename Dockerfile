FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
#ENV DATABASE_URL="postgresql://placeholder"
RUN npx prisma generate

COPY . .
RUN npm prune --omit=dev

RUN chmod +x /app/entrypoint.sh

#EXPOSE 5000
ENTRYPOINT ["/app/entrypoint.sh"]
