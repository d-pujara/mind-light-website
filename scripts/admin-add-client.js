/**
 * ADMIN SCRIPT: Add Client to Google Sheet
 * 
 * This script allows the AI Agent (or Admin) to programmatically add a new client
 * to the Google Sheet without opening the browser.
 * 
 * Usage: node scripts/admin-add-client.js --name="Hope Inc" --lat=34.05 --lng=-118.24 --video="url" --logo="local_path"
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// CONFIGURATION
const SPREADSHEET_ID = '1dBhlBgj30TnBwGU-HoMR0_itFXVqsiDfXbGbgOYA3gM'; // Updated from user URL
const SHEET_NAME = 'nonprofits_template'; // Correct Name found via debug
const KEY_FILE = 'credentials.json';

async function main() {
    // 1. Parsing Arguments (Simple implementation)
    const args = process.argv.slice(2).reduce((acc, arg) => {
        const [key, value] = arg.split('=');
        acc[key.replace('--', '')] = value;
        return acc;
    }, {});

    console.log("🤖 Agent Admin Tool: Adding Client...");
    console.log("   Data:", args);

    if (!args.name || !args.lat || !args.lng) {
        console.error("❌ Error: Missing required fields (name, lat, lng)");
        process.exit(1);
    }

    // 2. Authentication
    if (!fs.existsSync(KEY_FILE)) {
        console.error("❌ Error: 'credentials.json' not found. Please ask user to generate Service Account Key.");
        process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 3. Asset Management (Logo Move)
    let publicLogoPath = '';
    if (args.logo && fs.existsSync(args.logo)) {
        const filename = path.basename(args.logo);
        const destination = path.join(process.cwd(), 'public', 'assets', 'logos', filename);

        // Copy file
        fs.copyFileSync(args.logo, destination);
        console.log(`✅ Asset Secured: ${filename} -> public/assets/logos/`);
        publicLogoPath = `/assets/logos/${filename}`;
    } else {
        publicLogoPath = args.logo || '/transparent_logo.png';
    }

    // 4. Update or Append Logic
    try {
        // A. Read existing data to check for duplicates
        const readResponse = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:K`,
        });

        const rows = readResponse.data.values || [];
        const headers = rows[0]; // Assuming first row is headers

        let rowIndexToUpdate = -1;
        // Search for existing client by Name (Column A, index 0)
        for (let i = 1; i < rows.length; i++) {
            if (rows[i][0] && rows[i][0].toLowerCase().trim() === args.name.toLowerCase().trim()) {
                rowIndexToUpdate = i + 1; // Sheets are 1-indexed
                break;
            }
        }

        const newRowData = [
            args.name,                                   // Col A: Name
            args.category || "Community Services",       // Col B: Category
            args.description || "Added via Agent Admin", // Col C: Description
            args.location || "",                         // Col D: Location (Address String)
            `${args.lat}, ${args.lng}`,                  // Col E: Coordinates (Lat, Long)
            publicLogoPath,                              // Col F: LogoUrl
            args.website || "",                          // Col G: WebsiteUrl
            args.donate || "",                           // Col H: DonationUrl
            args.video || "",                            // Col I: VideoUrl
            "",                                          // Col J: InstagramUrl
            new Date().getFullYear().toString(),         // Col K: FoundedYear
            args.review || "",                           // Col L: Review
            args.issue || "",                            // Col M: Issue
            args.solution || "",                         // Col N: Solution
            args.directorName || "",                     // Col O: DirectorName
            args.directorImage || ""                     // Col P: DirectorImage
        ];

        if (rowIndexToUpdate > -1) {
            console.log(`🔄 Found existing client at Row ${rowIndexToUpdate}. Updating...`);
            await sheets.spreadsheets.values.update({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A${rowIndexToUpdate}`, // Start of the row
                valueInputOption: 'USER_ENTERED',
                resource: { values: [newRowData] },
            });
            console.log("✨ SUCCESS: Client Record Updated.");
        } else {
            console.log(`➕ New client. Appending to bottom...`);
            await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A:A`,
                valueInputOption: 'USER_ENTERED',
                resource: { values: [newRowData] },
            });
            console.log("✨ SUCCESS: Client Added to Global Map.");
        }

        console.log("   The website will auto-update in ~1 minute.");

    } catch (error) {
        console.error("❌ Google API Error:", error.message);
    }
}

main();
