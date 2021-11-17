const perform = (z, bundle) => {
  const options = {
    url: `${bundle.authData.api_url}/v3/previews/${bundle.inputData.preview}/jobs`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.token}`,
    },
    params: {},
  };

  if (bundle.inputData.action && bundle.inputData.action.length) {
    options.params = {
      action: bundle.inputData.action,
    };
  }

  return z.request(options).then((response) => response.json);
};

module.exports = {
  operation: {
    perform,
    inputFields: [
      {
        key: 'project',
        label: 'Project',
        type: 'string',
        dynamic: 'list_projects.project.name',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'repo',
        label: 'Repository',
        type: 'string',
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
        helpText: 'You can filter which job actions to search for.',
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
    ],
    sample: {
      "progress": 0,
      "target": "previews",
      "action": "refresh",
      "object": "60ad43d03e5c64a24e9d2575",
      "args": {
        "preview": "60ad43d03e5c64a24e9d2575",
        "children": true,
        "force": true
      },
      "createdAt": "2021-07-14T20:55:19.645Z",
      "updatedAt": "2021-07-14T20:55:52.155Z",
      "startedAt": "2021-07-14T20:55:19.708Z",
      "endedAt": "2021-07-14T20:55:51.528Z",
      "message": null,
      "result": "success",
      "id": "60ef4f3780afb0ff61415bdd",
      "type": "job",
      "job": "60ef4f3780afb0ff61415bdd",
      "project": "5fc6717502f60b6e8ad324ec",
      "repo": "60ad4392cde720fae86f213b",
      "preview": "60ad43d03e5c64a24e9d2575"
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
  key: 'find_jobs',
  noun: 'Job',
  display: {
    label: 'Find Jobs',
    description: 'Find Preview jobs',
    hidden: false,
    important: false,
  },
};
