
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new (require("@aws-sdk/client-dynamodb").DynamoDBClient)();

exports.handler = async (event) => {
    console.log(event)
    const { conversationId, sender, content, system } = event;
    const createdAt = new Date().now();
    const messageId = `msg-${createdAt}#${uuidv4()}`;

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            PK: { S: conversationId },
            SK: { S: messageId },
            sender: { S: sender },
            content: { S: content },
            system: { BOOL: system === undefined ? false : system },
            created_at: { S: createdAt }
        }
    };

    await client.send(new PutItemCommand(params));

    return {
        id: messageId,
        // conversation_id: conversationId,
        conversationId,
        sender,
        content,
        system: system === undefined ? false : system,
        created_at: createdAt
    };
};
