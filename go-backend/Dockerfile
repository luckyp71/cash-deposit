FROM golang

# Create the directory where the application will reside
RUN mkdir /go/src/cash-deposit
RUN mkdir /go/src/cash-deposit/go-backend

# ADD the application files (needed for production)
ADD . /go/src/cash-deposit/go-backend
ADD ./controllers /go/src/cash-deposit/go-backend/controllers
ADD ./email /go/src/cash-deposit/go-backend/email
ADD ./messages/consumer /go/src/cash-deposit/go-backend/messages/consumer
ADD ./messages/producer /go/src/cash-deposit/go-backend/messages/producer
ADD ./models /go/src/cash-deposit/go-backend/models
ADD ./testing /go/src/cash-deposit/go-backend/testing

# Specify working directory
WORKDIR /go/src/cash-deposit/go-backend

# Import dependencies needed
RUN go get github.com/gorilla/handlers
RUN go get github.com/gorilla/mux
RUN go get github.com/jinzhu/gorm
RUN go get github.com/jinzhu/gorm/dialects/postgres
RUN go get github.com/Shopify/sarama

# Run go-backend app
CMD ["go", "run", "main.go"]