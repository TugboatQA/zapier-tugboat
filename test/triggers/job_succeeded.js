require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData } = require('../lib/env');

// describe('Trigger - job_succeeded', () => {
//   zapier.tools.env.inject();
//
//   it('should get an array', async () => {
//     const bundle = {
//       authData,
//       inputData: {},
//     };
//
//     const results = await appTester(
//       App.triggers['job_succeeded'].operation.perform,
//       bundle
//     );
//     results.should.be.an.Array();
//   });
// });
