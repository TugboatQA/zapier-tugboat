require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
const { authData } = require('../lib/env');
const cache = require('../lib/cache');

// describe('Trigger - job_failed', () => {
//   zapier.tools.env.inject();
//
//   it('should get an array', async () => {
//     const bundle = {
//       authData,
//       inputData: {
//         preview: cache.preview,
//         cancelled: true,
//       },
//     };
//
//     const results = await appTester(
//       App.triggers['job_failed'].operation.perform,
//       bundle
//     );
//     results.should.be.an.Array();
//   });
// });
