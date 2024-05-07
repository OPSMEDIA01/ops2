function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    var CLIENT_ID = '487311574057-m72ef28mrejh4g9hta10su5ankpemrv0.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyDxUVS-myf0MtdGkte2TBlnf-j0Kpw5NHA';
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall();
    } else {
        gapi.auth2.getAuthInstance().signIn();
    }
}

function makeApiCall() {
    var form = document.getElementById('logForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        var date = document.getElementById('date').value;
        var startTime = document.getElementById('startTime').value;
        var endTime = document.getElementById('endTime').value;
        var task = document.getElementById('task').value;

        var params = {
            spreadsheetId: 'YOUR_SPREADSHEET_ID',
            range: 'Sheet1',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
        };

        var valueRangeBody = {
            "values": [
                [date, startTime, endTime, task]
            ]
        };

        var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
        request.then(function(response) {
            console.log(response);
            alert('Data submitted!');
        }, function(reason) {
            console.error('error: ' + reason.result.error.message);
        });
    }
}

document.addEventListener('DOMContentLoaded', handleClientLoad);
