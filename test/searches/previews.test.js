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

describe('Search - previews', () => {
  zapier.tools.env.inject();

  it('should get at least one preview', async () => {
    const ref = 'main';

    const bundle = {
      authData,

      inputData: {
        repo: process.env.TUGBOAT_REPO,
        ref,
      },
    };

    const results = await appTester(
        App.searches['find_previews'].operation.perform,
        bundle
    );
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
    results[0].should.have.property('ref');
    results[0].ref.should.be.eql(ref);
  });

  it('should get all previews', async () => {
    const bundle = {
      authData,

      inputData: {
        repo: process.env.TUGBOAT_REPO,
      },
    };

    const results = await appTester(
        App.searches['find_previews'].operation.perform,
        bundle
    );
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
  });
});
