require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData, tugboatTestIds } = require('../lib/env');
const cache = require('../lib/cache');

describe('Create - create_preview', () => {
  zapier.tools.env.inject();

  it('should create a Preview', async () => {
    const bundle = {
      authData,

      inputData: {
        repo: tugboatTestIds.repo,
        name: "main",
        type: "branch",
        expires: new Date(Date.now() + 5 * 60 * 1000).toString(),
      },
    };

    const result = await appTester(
      App.creates['create_preview'].operation.perform,
      bundle
    );
    result.should.be.an.Object();
    result.should.have.property('action');
    result.action.should.be.eql('build');
    result.should.have.property('target');
    result.target.should.be.eql('previews');
    result.should.have.property('type');
    result.type.should.be.eql('job');
    result.should.have.property('preview');
    result.preview.should.be.a.String();
    cache.preview = result.preview;
  });
});

describe('Create - find_preview', () => {
  zapier.tools.env.inject();

  it('should find a Preview', async () => {
    const bundle = {
      authData,
      inputData: {
        preview: cache.preview,
      },
    };

    const result = await appTester(
      App.creates['find_preview'].operation.perform,
      bundle
    );
    result.should.be.an.Object();
  });
});

describe('Create - update_preview', () => {
  zapier.tools.env.inject();

  it('should update a Preview', async () => {
    const bundle = {
      authData,
      inputData: {
        preview: cache.preview,
        name: 'Test name change'
      },
    };

    const result = await appTester(
      App.creates['update_preview'].operation.perform,
      bundle
    );
    result.should.be.an.Object();
    result.should.have.property('name');
    result.name.should.be.eql('Test name change');
  });
});


describe('Create - rebuild_preview', () => {
  zapier.tools.env.inject();

  it('should rebuild a Preview', async () => {
    const bundle = {
      authData,
      inputData: {
        preview: cache.preview,
        force: true,
      },
    };

    const result = await appTester(
      App.creates['rebuild_preview'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});



describe('Create - refresh_preview', () => {
  zapier.tools.env.inject();

  it('should refresh a Preview', async () => {
    const bundle = {
      authData,
      inputData: {
        preview: cache.preview,
        force: true
      },
    };

    const result = await appTester(
      App.creates['refresh_preview'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
