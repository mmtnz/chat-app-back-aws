
const { QueryCommand } = require("@aws-sdk/client-dynamodb");

const client = new (require("@aws-sdk/client-dynamodb").DynamoDBClient)();

exports.handler = async (event) => {
    const { conversationId } = event.arguments;

    const params = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :prefix)",
        ExpressionAttributeValues: {
            ":pk": { S: conversationId },
            ":prefix": { S: "msg-" }
        }
    };

    const result = await client.send(new QueryCommand(params));

    return result.Items.map(item => ({
        id: item.SK.S,
        conversation_id: item.PK.S,
        sender: item.sender.S,
        content: item.content.S,
        system: item.system?.BOOL || false,
        created_at: item.created_at.S
    })).sort((a, b) => a.created_at.localeCompare(b.created_at));
};
