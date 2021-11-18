require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData } = require('../lib/env');

// describe('Create - suspend_preview', () => {
//   zapier.tools.env.inject();
//
//   it('should create an object', async () => {
//     const bundle = {
//       authData,
//       inputData: {},
//     };
//
//     const result = await appTester(
//       App.creates['suspend_preview'].operation.perform,
//       bundle
//     );
//     result.should.not.be.an.Array();
//   });
// });
