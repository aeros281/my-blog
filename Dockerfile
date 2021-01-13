FROM node:lts-alpine AS base

WORKDIR /base
COPY package*.json ./

#https://forums.docker.com/t/symlinks-on-shared-volumes-not-supported/9288
RUN npm install --no-bin-links

COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:lts-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

EXPOSE 3000
CMD npm run start