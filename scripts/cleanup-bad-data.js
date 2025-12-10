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
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Based on my debug, Row 5 had the ID "4005" in the Name column
    // The sheet ID for "nonprofits_template" is needed for deleteDimension
    // But since I don't know the sheetId (integer), I will just CLEAR the row content.

    // Actually, I can search for "4005" and clear it.
    try {
        const readResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:A`,
        });

        const rows = readResponse.data.values;
        let rowIndexToDelete = -1;

        for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] && rows[i][0].includes('4005')) {
                rowIndexToDelete = i + 1;
                console.log(`Found Bad Row at ${rowIndexToDelete}: ${rows[i][0]}`);
                break;
            }
        }

        if (rowIndexToDelete > -1) {
            await sheets.spreadsheets.values.clear({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A${rowIndexToDelete}:Z${rowIndexToDelete}`,
            });
            console.log(`✅ Cleared Bad Row ${rowIndexToDelete}`);
        } else {
            console.log("No bad row found.");
        }

    } catch (e) {
        console.error(e);
    }
}
main();
