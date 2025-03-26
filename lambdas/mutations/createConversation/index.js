
const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new (require("@aws-sdk/client-dynamodb").DynamoDBClient)();

exports.handler = async (event) => {

    console.log(event)
    const { name } = event;
    const id = uuidv4();
    const createdAt = Date.now();

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            PK: { S: id },
            SK: { S: "META" },
            name: { S: name },
            createdAt: { S:  `${createdAt}` }
        }
    };

    await client.send(new PutItemCommand(params));

    return {
        id,
        name,
        createdAt: createdAt
    };
};
