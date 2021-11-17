require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const authData = {
  api_url: process.env.API_URL,
  token: process.env.TOKEN,
  oauth_consumer_key: process.env.OAUTH_CONSUMER_KEY,
  oauth_consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
  oauth_token: process.env.OAUTH_TOKEN,
  oauth_token_secret: process.env.OAUTH_TOKEN_SECRET,
};

describe('Search - jobs', () => {
  zapier.tools.env.inject();

  it('should get at least one job', async () => {
    const previews = await appTester(
        App.searches['find_previews'].operation.perform,
        {
          authData,
          inputData: {
            repo: process.env.TUGBOAT_REPO,
          },
        });

    const results = await appTester(
        App.searches['find_jobs'].operation.perform,
        {
          authData,

          inputData: {
            preview: previews[0].id,
          },
        });
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
  });

});
