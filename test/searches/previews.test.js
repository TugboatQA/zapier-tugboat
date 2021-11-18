require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData } = require('../lib/env');

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
