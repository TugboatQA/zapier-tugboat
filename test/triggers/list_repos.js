require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData, tugboatTestIds } = require('../lib/env');

describe('Trigger - list_repos', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {
    const bundle = {
      authData,
      inputData: {
        project: tugboatTestIds.project
      },
    };

    const results = await appTester(
      App.triggers['list_repos'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
  });
});
