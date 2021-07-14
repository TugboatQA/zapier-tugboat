const getInputFields = (z, bundle) => {
  let field = {
    key: 'ref',
    type: 'string',
    label: 'Ref',
    helpText:
      'The git ref to build the Preview for. This can be a pull request number, branch, tag, or commit hash',
    required: true,
  };

  if (bundle.inputData.type && bundle.inputData.repo) {
    let options = {
      url: `${bundle.authData.api_url}/v3/repos/${bundle.inputData.repo}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + bundle.authData.token,
      },
    };

    switch (bundle.inputData.type) {
      case 'pullrequest':
      case 'mergerequest':
        options.url = options.url + '/pulls';
        return z.request(options).then((response) => {
          response.throwForStatus();
          const results = response.json;
          field.choices = results.map((pr) => {
            return {
              label: `${pr.name} (${pr.number})`,
              value: pr.number,
            };
          });
          return field;
        });

      case 'branch':
        options.url = options.url + '/branches';
        return z.request(options).then((response) => {
          response.throwForStatus();
          const results = response.json;
          field.choices = results.map((branch) => {
            return branch.name;
          });
          return field;
        });

      case 'tag':
        options.url = options.url + '/tags';
        return z.request(options).then((response) => {
          response.throwForStatus();
          const results = response.json;
          field.children = results.map((tag) => {
            return tag.name;
          });
          return field;
        });
    }
  }

  return field;
};

const getInputFields1 = (z, bundle) => {
  let field = {
    key: 'base',
    label: 'Base Preview',
    type: 'string',
    default: 'default',
    helpText:
      'Defines which Preview(s) to use as a Base Preview for the Preview being created. See https://api.tugboat.qa/v3#tag/Previews/paths/~1previews/post for details on these options.',
    choices: ['default', 'none', 'branch', 'repo', 'auto'],
  };

  if (!bundle.inputData.repo) {
    return field;
  }

  const options = {
    url: `${bundle.authData.api_url}/v3/repos/${bundle.inputData.repo}/previews`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + bundle.authData.token,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    results.sort((a, b) => {
      return b.anchor && !a.anchor ? 1 : 0;
    });

    field.choices.push(
      ...results.map((preview) => {
        return {
          label: preview.anchor
            ? `${preview.name} (Base Preview)`
            : preview.name,
          value: preview.preview,
        };
      })
    );

    return field;
  });
};

const getInputFields2 = (z, bundle) => {
  if (bundle.inputData.anchor && bundle.inputData.type === 'branch') {
    return {
      key: 'anchor_type',
      label: 'Anchor Type',
      helpText:
        'When anchor is true, this defines how the preview is used as a default Base Preview',
      default: 'repo',
      choices: [
        {
          label:
            'Automatically use this Preview as a Base Preview for all new Previews built for the Repository',
          value: 'repo',
        },
        {
          label:
            'Automatically use this Preview as a Base Preview for new pull request Previews that merge into the branch used to create this Preview',
          value: 'branch',
        },
      ],
    };
  }
};

module.exports = {
  operation: {
    perform: {
      url: '{{bundle.authData.api_url}}/v3/previews',
      method: 'POST',
      params: {},
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer {{bundle.authData.token}}',
      },
      body: {
        repo: '{{bundle.inputData.repo}}',
        name: '{{bundle.inputData.name}}',
        type: '{{bundle.inputData.type}}',
        anchor: '{{bundle.inputData.anchor}}',
        expires: '{{bundle.inputData.expires}}',
        base: '{{bundle.inputData.base}}',
        ref: '{{bundle.inputData.ref}}',
        anchor_type: '{{bundle.inputData.anchor_type}}',
        config: '{{bundle.inputData.config}}',
      },
      removeMissingValuesFrom: { params: false, body: true },
    },
    inputFields: [
      {
        key: 'project',
        label: 'Tugboat Project',
        type: 'string',
        dynamic: 'list_projects.project.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'repo',
        label: 'Repository ID',
        type: 'string',
        dynamic: 'list_repos.repo.name',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        helpText:
          'A human-readable label for the Preview. If not specified, the ref is used.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'type',
        label: 'Type',
        type: 'string',
        choices: ['pullrequest', 'mergerequest', 'branch', 'tag', 'commit'],
        helpText:
          'The type of Preview to create. If not specified, Tugboat attempts to guess the type by searching for a ref that matches the provided preview name in the following order. The first matching ref is used for the preview.',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      getInputFields,
      getInputFields1,
      {
        key: 'anchor',
        label: 'Anchor',
        type: 'boolean',
        helpText:
          'Whether the Preview is used as a Base Preview for the Repository.',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      getInputFields2,
      {
        key: 'expires',
        label: 'Expires',
        type: 'datetime',
        helpText:
          'If set, the Preview will automatically be deleted at this time.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'config',
        label: 'Custom Tugboat Config',
        type: 'text',
        helpText:
          'An optional [Preview configuration](https://docs.tugboat.qa/setting-up-tugboat/create-a-tugboat-config-file/) to use instead of trying to read config.yml from the git repository.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      project: '5d810c19f6f8203d5b65ef01',
      repo: '5d810c19f6f82083ed65ef03',
      preview: '5d9b842252163ca8a1508c11',
      action: 'build',
      target: 'previews',
      args: {},
      createdAt: '2019-08-24T14:15:22Z',
      endedAt: '2019-08-24T14:15:22Z',
      id: '5d9e0a3f7f02ad896974a975',
      job: '5d9e0a3f7f02ad896974a975',
      key: '5d9b5bfb52163ce4e1508c07',
      message: 'string',
      object: '5d55823f30af7a1be3899ca4',
      result: 'success',
      startedAt: '2019-08-24T14:15:22Z',
      type: 'job',
      updatedAt: '2019-08-24T14:15:22Z',
    },
    outputFields: [
      { key: 'project' },
      { key: 'repo' },
      { key: 'preview' },
      { key: 'action' },
      { key: 'target' },
      { key: 'createdAt' },
      { key: 'endedAt' },
      { key: 'id' },
      { key: 'job' },
      { key: 'key' },
      { key: 'message' },
      { key: 'object' },
      { key: 'result' },
      { key: 'startedAt' },
      { key: 'type' },
      { key: 'updatedAt' },
    ],
  },
  key: 'create_preview',
  noun: 'Job',
  display: {
    label: 'Create a Preview',
    description: 'Create a Tugboat Preview',
    hidden: false,
    important: true,
  },
};
