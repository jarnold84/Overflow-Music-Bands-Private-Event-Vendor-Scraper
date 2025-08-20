FROM apify/actor-node-playwright-chrome:22-1.54.1

# Copy essential files explicitly
COPY package.json ./
COPY tsconfig.json ./
COPY src/ src/

# 🧪 Debug directory structure (optional)
# RUN echo "Contents:" && ls -R

RUN npm install
RUN npm run build

CMD ["npm", "start"]
