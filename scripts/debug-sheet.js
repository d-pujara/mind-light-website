import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SPREADSHEET_ID = '1dBhlBgj30TnBwGU-HoMR0_itFXVqsiDfXbGbgOYA3gM';
const KEY_FILE = 'credentials.json';

async function main() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        console.log("📄 Sheet Names found:");
        response.data.sheets.forEach(sheet => {
            console.log(`   - "${sheet.properties.title}"`);
        });
    } catch (error) {
        console.error("❌ Error fetching sheet metadata:", error.message);
    }
}

main();
