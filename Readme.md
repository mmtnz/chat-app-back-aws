# Chat App AWS Backend

This is the backend for a real-time message chat application, built using **GraphQL** with **AWS AppSync** and **DynamoDB** database running inside Docker. It provides APIs for sending, retrieving, and managing chat messages.

## 🚀 Features
- **Create Conversations**:
Start a new chat thread between users. 
- **Send Messages**:
Send messages within a conversation. Each message is stored in the DynamoDB database.
- **Real-time Subscriptions**:
Subscribe to conversations and receive real-time updates when new messages are sent (powered by GraphQL Subscriptions).


## 📸 Screenshots
![image](https://github.com/user-attachments/assets/12d82936-2242-4e0e-8c38-d1da905f3d15)

## 🛠️ Tech Stack

- GraphQL (AWS AppSync)
- AWS DynamoDB (via Docker)
- AWS Lambda (Node.js)
- AWS CloudWatch
- AWS CloudFormation for deployment

## Getting Started

### Prerequisites

- AWS Account
- AWS CLI

### 1. Clone the repo
```bash
git clone https://github.com/mmtnz/chat-app-back-aws.git
cd chat-app-back-aws
```

### 2. Install dependencies
```bash
npm install
```

### 3. Edit template.yml
Because we are using API_KEY for AppSync auth and the max expiration time is 1 year, let's make sure it is one year from the deployment time.
```bash
  ChatGraphQLApiKey:
    Type: AWS::AppSync::ApiKey
    Properties:
      ApiId: !GetAtt ChatGraphQLApi.ApiId
      Expires: 1774459540 # Replace this timestamp with a more recent one
```

### 4. Build and Deploy the template
```bash
sam build
sam deploy --guided
```

### 5. Try it
You can try the different queries from the AWS AppSync Queries tool.

Example of query:
```bash
query Conversation($id: ID!) {
    conversation(id: $id) {
        id
        name
    }
}
```

### 6. Launch the front end (Optional)
To have a user friendly GUI install the front end [Chat App Frontend](https://github.com/mmtnz/chat-app-front).


## 🎯 Project Purpose
This App was built for practicing:

- GraphQL API
- WebSockets
- AWS AppSync
- AWS DynamoDB
- AWS Lambda
- AWS CloudFormation deployments
- AWS CloudWatch

## ⚖️ License
This project is licensed under the MIT License.

## Contributing
Pull requests are welcome! Feel free to open issues or suggest features.


## 📌 TODOs
- Add user authentication
- Have the option to delete chats (if authentication) or delete old ones