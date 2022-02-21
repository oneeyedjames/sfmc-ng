const { writeFile } = require('fs');

require('dotenv').config();

const path = './env.ts';
const body = `
export const env = {
   API_KEY: "${process.env.API_KEY}"
};
`;

writeFile(path, body, (err: any) => {
	if (err) console.error(err);
	else console.log('Wrote .env variables to env.ts');
});
