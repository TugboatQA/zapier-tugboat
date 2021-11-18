const perform = (z, bundle) => {
  let options = {
    url: `${bundle.authData.api_url}/v3/previews/${bundle.inputData.preview}/jobs`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.token}`,
    },
    redirect: 'manual',
  };

  if (bundle.inputData.action && bundle.inputData.action.length) {
    options.params = {
      action: bundle.inputData.action,
    };
  }

  const failedResults = bundle.inputData.cancelled
    ? ['error', 'cancelled']
    : ['error'];

  return z.request(options).then((response) => {
    const jobs = response.json;

    if (!jobs.length) {
      return [];
    }

    return jobs.filter((job) => failedResults.includes(job.result));
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'project',
        type: 'string',
        label: 'Project',
        dynamic: 'list_projects.project.name',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'repo',
        type: 'string',
        label: 'Repository',
        dynamic: 'list_repos.repo.name',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'preview',
        type: 'string',
        label: 'Preview',
        dynamic: 'list_previews.preview.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'action',
        type: 'string',
        label: 'Filter by Action(s)',
        helpText: 'You can filter which job actions will trigger this.',
        choices: [
          'build',
          'clone',
          'rebuild',
          'refresh',
          'rekey',
          'reset',
          'start',
          'stop',
          'suspend',
          'update',
        ],
        required: false,
        list: true,
        altersDynamicFields: false,
      },
      {
        key: 'cancelled',
        type: 'boolean',
        label: 'Consider cancelled a failure',
        default: 'false',
        helpText:
          'Select true if you would like to considered cancelled jobs as a failed job.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      progress: 0,
      target: 'previews',
      action: 'rebuild',
      object: '60ae4cc23e5c6473909df427',
      args: {
        preview: '60ae4cc23e5c6473909df427',
        children: false,
        force: false,
      },
      createdAt: '2021-05-26T14:22:55.043Z',
      updatedAt: '2021-05-26T14:23:03.554Z',
      startedAt: '2021-05-26T14:22:55.091Z',
      endedAt: '2021-05-26T14:23:03.532Z',
      message:
        'Cannot rebuild preview (Tugboat Error 1046): 60ae59bfcde72037426fd6a3 was cancelled',
      result: 'error',
      id: '60ae59bfcde72037426fd6a3',
      type: 'job',
      job: '60ae59bfcde72037426fd6a3',
      project: '5fc6717502f60b6e8ad324ec',
      repo: '60ad4392cde720fae86f213b',
      preview: '60ae4cc23e5c6473909df427',
    },
    outputFields: [
      { key: 'progress', type: 'integer' },
      { key: 'target' },
      { key: 'action' },
      { key: 'object' },
      { key: 'args__preview' },
      { key: 'args__children', type: 'boolean' },
      { key: 'args__force', type: 'boolean' },
      { key: 'createdAt', type: 'datetime' },
      { key: 'updatedAt', type: 'datetime' },
      { key: 'startedAt', type: 'datetime' },
      { key: 'endedAt', type: 'datetime' },
      { key: 'message' },
      { key: 'result' },
      { key: 'id' },
      { key: 'type' },
      { key: 'job' },
      { key: 'project' },
      { key: 'repo' },
      { key: 'preview' },
    ],
  },
  key: 'job_failed',
  noun: 'Job',
  display: {
    label: 'Job Failed',
    description: 'Triggers when a job has failed.',
    directions:
      'If you are using the "Create a Preview" or "Rebuild a Preview" actions, you can use this trigger to detect when the associated job has failed.',
    hidden: false,
    important: true,
  },
};
