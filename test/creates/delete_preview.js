require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData } = require('../lib/env');
const cache = require('../lib/cache');

describe('Create - delete_preview', () => {
  zapier.tools.env.inject();

  it('should delete a Preview', async () => {
    const result = await appTester(
      App.creates['delete_preview'].operation.perform,
        {
          authData,
          inputData: {
            preview: cache.preview,
            force: true
          },
        }
    );
    result.should.be.an.Object();
    result.should.have.property('message');
    result.message.should.be.eql('Deleting');
  });
});
