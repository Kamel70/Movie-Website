const { writeFile } = require('fs');
const { argv } = require('yargs');

// Read environment variables
const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

// Environment file content
const envConfigFile = `export const environment = {
  production: ${isProduction},
  apiKey: '${process.env.API_KEY || ''}',
  tmdbBaseUrl: 'https://api.themoviedb.org/3/'
};
`;
// Write the file
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Output generated at ${targetPath}`);
});
