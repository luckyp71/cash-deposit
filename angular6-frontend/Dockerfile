# Installs the current application on a Node Image.
FROM node

# Create the directory where the application will reside
RUN mkdir /go
RUN mkdir /go/src
RUN mkdir /go/src/cash-deposit
RUN mkdir /go/src/cash-deposit/angular6-frontend

# ADD the application files (needed for production)
ADD . /go/src/cash-deposit/angular6-frontend

# Specify working directory
WORKDIR /go/src/cash-deposit/angular6-frontend

# Copy dependency definitions
COPY package.json /go/src/cash-deposit/angular6-frontend

# Install dependencies using npm
RUN npm install
RUN npm install -g @angular/cli

#Build the app
RUN npm run build

# Run angular6-frontend app
CMD ng serve --host 0.0.0.0