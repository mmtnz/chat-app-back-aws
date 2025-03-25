
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new (require("@aws-sdk/client-dynamodb").DynamoDBClient)();

exports.handler = async (event) => {
    const { name } = event.arguments;
    const id = uuidv4();
    const createdAt = new Date().toISOString();

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            PK: { S: id },
            SK: { S: "META" },
            name: { S: name },
            created_at: { S: createdAt }
        }
    };

    await client.send(new PutItemCommand(params));

    return {
        id,
        name,
        created_at: createdAt
    };
};
