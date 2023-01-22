FROM node:18.13.0-alpine AS base

WORKDIR /base
COPY package*.json .npmrc* ./

ARG SHARP_URL
ENV SHARP_DIST_BASE_URL=${SHARP_URL}

RUN npm ci

COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./

RUN npm run build

FROM node:18.13.0-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /build/package*.json /build/.npmrc* ./
COPY --from=build /build/.env* ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public

ARG SHARP_URL
ENV SHARP_DIST_BASE_URL=${SHARP_URL}

RUN npm install next

EXPOSE 3000
CMD npm run start
