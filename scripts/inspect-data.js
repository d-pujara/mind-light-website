import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const SPREADSHEET_ID = '1dBhlBgj30TnBwGU-HoMR0_itFXVqsiDfXbGbgOYA3gM';
const SHEET_NAME = 'nonprofits_template';
const KEY_FILE = 'credentials.json';

async function main() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A1:E10`, // Read top 10 rows, first 5 cols
        });

        const rows = response.data.values;
        if (rows.length) {
            console.log('Name Column (Col B):');
            rows.forEach((row, index) => {
                console.log(`[Row ${index + 1}] ID: ${row[0]}, Name: "${row[1]}"`);
            });
        } else {
            console.log('No data found.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
