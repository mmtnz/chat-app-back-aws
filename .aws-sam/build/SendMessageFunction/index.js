
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new (require("@aws-sdk/client-dynamodb").DynamoDBClient)();

exports.handler = async (event) => {
    
    const { conversationId, sender, content, system } = event.arguments;
    const createdAt = new Date().toISOString();
    const messageId = `msg-${createdAt}#${uuidv4()}`;

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            PK: { S: conversationId },
            SK: { S: messageId },
            sender: { S: sender },
            content: { S: content },
            system: { BOOL: system || false },
            created_at: { S: createdAt }
        }
    };

    await client.send(new PutItemCommand(params));

    return {
        id: messageId,
        conversation_id: conversationId,
        sender,
        content,
        system: system || false,
        created_at: createdAt
    };
};
