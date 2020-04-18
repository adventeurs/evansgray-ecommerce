
module.exports = (req, res) => {
    res.send({
            firebase: {
              apiKey: process.env.FIREBASE_API,
              authDomain: process.env.FIREBASE_AUTH_DOMAIN,
              databaseURL: process.env.DATABASE_URL,
              projectId: process.env.PROJECT_ID,
              storageBucket: process.env.STORAGE_BUCKET,
              messagingSenderId: process.env.SENDER_ID,
              appId: process.env.APP_ID,
              measurementId: process.env.MEASUREMENT_ID
            }
    })
}
