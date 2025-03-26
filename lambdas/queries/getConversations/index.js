
const { ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new (require("@aws-sdk/client-dynamodb").DynamoDBClient)();

exports.handler = async () => {
    const params = {
        TableName: process.env.TABLE_NAME,
        FilterExpression: "SK = :meta",
        ExpressionAttributeValues: {
            ":meta": { S: "META" }
        }
    };

    const result = await client.send(new ScanCommand(params));

    return result.Items.map(item => ({
        id: item.PK.S,
        name: item.name.S,
        createdAt: item.createdAt.S
    }));
};
