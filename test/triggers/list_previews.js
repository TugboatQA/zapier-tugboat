require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData, tugboatTestIds } = require('../lib/env');

describe('Trigger - list_previews', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {
    const bundle = {
      authData,
      inputData: {
        repo: tugboatTestIds.repo
      },
    };

    const results = await appTester(
      App.triggers['list_previews'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
  });
});
