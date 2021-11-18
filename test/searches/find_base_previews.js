require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData } = require('../lib/env');

describe('Search - find_base_previews', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {
    const bundle = {
      authData,
      inputData: {
        repo: process.env.TUGBOAT_REPO,
      },
    };

    const results = await appTester(
      App.searches['find_base_previews'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
    results[0].should.have.property('anchor');
    results[0].anchor.should.be.eql(true);
  });
});
