const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {

    let notificationPayload = JSON.stringify(event.body);

    try {
        let r = await sns.publish({
            Message: notificationPayload,
            Subject: "Notification",
            TopicArn: `arn:aws:sns:us-east-1:${process.env.SIGMA_AWS_ACC_ID}:Notifications`,
            MessageStructure: "String",
            MessageAttributes: {}
        }).promise();

        console.log("Successfully sent notification");
        return true;

    } catch (err) {
        console.log("Failed to send notification", err);
        throw err;
    };
};