const authentication = require('./authentication');
const listProjectsTrigger = require('./triggers/list_projects.js');
const listReposTrigger = require('./triggers/list_repos.js');
const listPreviewsTrigger = require('./triggers/list_previews.js');
const jobFailedTrigger = require('./triggers/job_failed.js');
const jobSucceededTrigger = require('./triggers/job_succeeded.js');
const createPreviewCreate = require('./creates/create_preview.js');
const rebuildPreviewCreate = require('./creates/rebuild_preview.js');
const deletePreviewCreate = require('./creates/delete_preview.js');
const refreshPreviewCreate = require('./creates/refresh_preview.js');
const updatePreviewCreate = require('./creates/update_preview.js');
const findPreviewCreate = require('./creates/find_preview.js');
const suspendPreviewCreate = require('./creates/suspend_preview.js');
const waitForJobCreate = require('./creates/wait_for_job.js');
const findBasePreviewsSearch = require('./searches/find_base_previews.js');
const findPreviewsSearch = require('./searches/find_previews.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [createPreviewCreate.key]: createPreviewCreate,
    [rebuildPreviewCreate.key]: rebuildPreviewCreate,
    [deletePreviewCreate.key]: deletePreviewCreate,
    [refreshPreviewCreate.key]: refreshPreviewCreate,
    [updatePreviewCreate.key]: updatePreviewCreate,
    [findPreviewCreate.key]: findPreviewCreate,
    [suspendPreviewCreate.key]: suspendPreviewCreate,
    [waitForJobCreate.key]: waitForJobCreate,
  },
  triggers: {
    [listProjectsTrigger.key]: listProjectsTrigger,
    [listReposTrigger.key]: listReposTrigger,
    [listPreviewsTrigger.key]: listPreviewsTrigger,
    [jobFailedTrigger.key]: jobFailedTrigger,
    [jobSucceededTrigger.key]: jobSucceededTrigger,
  },
  searches: {
    [findBasePreviewsSearch.key]: findBasePreviewsSearch,
    [findPreviewsSearch.key]: findPreviewsSearch,
  },
};
