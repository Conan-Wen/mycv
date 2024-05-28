FROM node:21.7.3-slim AS builder
USER node
WORKDIR /home/node/
COPY --chown=node:node ./ ./
RUN npm ci --omit=dev --ignore-scripts \
  && npm run build

FROM node:21.7.3-slim
USER node
WORKDIR /home/node/
COPY --from=builder /home/node/dist/ dist/
COPY --from=builder /home/node/package.json /home/node/package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
