/**
 * Utility to fetch and parse CSV data from Google Sheets
 */

export const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    return lines.slice(1).map(line => {
        // Handle complex CSV lines (e.g. quoted values with commas) can be tricky
        // This is a basic split implementation. For production, consider using a library like papaparse
        // provided we can install dependencies. For now, we assume simple CSV structure.

        // Simple regex to handle quoted strings with commas
        const values = [];
        let matches;
        const re = /(?:,|^)(?:"([^"]*)"|([^",]*))/g;

        while ((matches = re.exec(line)) !== null) {
            // If the match is empty (often happens at the end), skip unless it's a genuine empty field
            if (matches[0] === '' && matches.index === re.lastIndex) continue;

            // matches[1] is quoted value, matches[2] is unquoted
            let val = matches[1] !== undefined ? matches[1] : matches[2];
            values.push(val ? val.trim() : '');
        }

        // Map values to headers
        const entry = {};
        headers.forEach((header, index) => {
            // Remove any carriage returns
            const cleanHeader = header.replace('\r', '');
            if (values[index] !== undefined) {
                entry[cleanHeader] = values[index].replace('\r', '');
            }
        });

        return entry;
    }).filter(entry => entry.name); // Filter out empty lines
};

export const transformSheetData = (rawClients) => {
    return rawClients.map((client, index) => {
        // Validation helpers
        let parsedCoords = [34.0522, -118.2437]; // Default LA
        if (client.coordinates) {
            try {
                const parts = client.coordinates.split(',').map(n => parseFloat(n.trim()));
                if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                    parsedCoords = parts;
                }
            } catch (e) {
                console.warn(`Invalid coordinates for row ${index}:`, client.coordinates);
            }
        }

        return {
            id: client.id || `sheet-${index}`,
            name: client.name || 'Unknown Nonprofit',
            category: client.category || 'Nonprofit',
            description: client.description || '',
            location: client.location || '',
            coordinates: parsedCoords,
            logoUrl: client.logoUrl || '/transparent_logo.png',
            websiteUrl: client.websiteUrl || '#',
            donationUrl: client.donationUrl || '#',
            videoUrl: client.videoUrl || '',
            instagramUrl: client.instagramUrl || '',
            foundedYear: parseInt(client.foundedYear) || new Date().getFullYear(),
            review: client.review || '',
            issue: client.issue || '',
            solution: client.solution || '',
            executiveDirector: {
                name: client.directorName || '',
                imageUrl: client.directorImage || ''
            }
        };
    }).filter(client => client.name !== 'Unknown Nonprofit' && client.coordinates); // Extra safety filter
};

export const fetchClientsFromSheet = async (sheetCsvUrl) => {
    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`${sheetCsvUrl}&t=${timestamp}`);
        const text = await response.text();
        const rawData = parseCSV(text);
        return transformSheetData(rawData);
    } catch (error) {
        console.error("Error fetching Google Sheet:", error);
        return [];
    }
};
