
const { GetItemCommand  } = require("@aws-sdk/client-dynamodb");
const client = new (require("@aws-sdk/client-dynamodb").DynamoDBClient)();

exports.handler = async (event) => {
    const {id} = event;

    const pk = id;
    const sk = "META";

    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            PK: { S: pk },
            SK: { S: sk },
        },
      };

    const result = await client.send(new GetItemCommand(params));
    if (!result.Item) {
        return 
    }
    return {
        id: result.Item.PK.S,
        name: result.Item.name.S,
        created_at: result.Item.created_at.S

    }
};
