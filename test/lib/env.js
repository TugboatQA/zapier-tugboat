require('dotenv').config();

module.exports.authData = Object.freeze({
    api_url: process.env.API_URL,
    token: process.env.TOKEN,
});

module.exports.tugboatTestIds = {
  repo: process.env.TUGBOAT_REPO,
  project: process.env.TUGBOAT_PROJECT,
}
