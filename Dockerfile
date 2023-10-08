FROM node:18

# Create app directory
WORKDIR /app

# Copy the package.json and yarn.lock file
COPY package.json ./
COPY yarn.lock ./

# Generated prisma files
COPY prisma ./prisma/

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install app dependencies using Yarn
RUN yarn install

# This command reads your Prisma schema and generates your Prisma Client library
RUN npx prisma generate

# Copy the code to working directory
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Start the app
CMD yarn start && npx prisma migrate dev