const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '153919299508-4r1opfaioart4vhhknsn0m3m25lg153c.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//049SQpfxx9OoWCgYIARAAGAQSNwF-L9IriHzWeSz5Ibwg8RI45WkEfpOyTiTsfpOCU1X38acO2nGo67weBM7vFbOoxsXYrWdxf30';



const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URL
)

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



const drive = google.drive({ version: 'v3', auth: oauth2Client })

const filePath = path.join(__dirname, 'img_test.jpg')

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'testCaricamentoDrive.jpg',
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            }
        })


        console.log(response.data)

    } catch (error) {
        console.log(error.message)
    }
}




async function listFile() {
    try {
        drive.files.list({
            pageSize: 50,
            fields: 'nextPageToken, files(id, name)',
            name : 'Enea Cericola-1.jpg',
            mimeType : 'application/vnd.google-apps.folder',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                console.log('Files:');
                files.map((file) => {
                    console.log(`${file.name} (${file.id})`);
                });
            } else {
                console.log('No files found.');
            }
        });

    } catch (error) {

    }
}


// uploadFile();

//listFile()
const files = [];
async function listFile2() {
    try {
        const res = await drive.files.list({
         // q: 'mimeType=\'application/vnd.google-apps.folder\'',
          fields: 'nextPageToken, files(id, name)',
          spaces: 'drive',
          pageSize: 10,
          fileId: '1DuDuSFS3ic_HbR7NX6628f8io2W8EQ4f',
        });
        Array.prototype.push.apply(files, res.files);
        res.data.files.forEach(function(file) {
          console.log('Found file:', file.name, file.id);
        });
        return res.data.files;
      } catch (err) {
        // TODO(developer) - Handle error
        throw err;
      }
}
async function listFile3() {
    try {
        const res = await drive.files.list({
            q: mimeType = 'application/vnd.google-apps.folder',
            spaces: 'drive',
            pageSize: 50,
            fields: 'nextPageToken, files(id, name)',
        });
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}

listFile2()