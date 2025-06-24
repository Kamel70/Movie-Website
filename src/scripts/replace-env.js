const fs = require('fs');
const path = require('path');

// Path to your production environment file
const envPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

// Read the file
let envContent = fs.readFileSync(envPath, 'utf8');

// Replace placeholders with actual environment variables
envContent = envContent.replace('PLACEHOLDER_API_KEY', process.env.API_KEY || '');

// Add more replacements as needed
// envContent = envContent.replace('PLACEHOLDER_OTHER_VAR', process.env.OTHER_VAR || '');

// Write the file back
fs.writeFileSync(envPath, envContent);

console.log('Environment variables replaced successfully');
