require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData } = require('../lib/env');

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
