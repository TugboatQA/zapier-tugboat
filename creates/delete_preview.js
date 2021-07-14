const perform = (z, bundle) => {
  const options = {
    url: `${bundle.authData.api_url}/v3/previews/${bundle.inputData.preview}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.token}`,
    },
    body: {
      force: bundle.inputData.force,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    return {
      message: 'Deleting',
    };
  });
};

module.exports = {
  operation: {
    perform: perform,
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
        label: 'Preview',
        type: 'string',
        dynamic: 'list_previews.preview.name',
        search: 'find_base_previews.preview',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'force',
        label: 'Force',
        type: 'boolean',
        helpText:
          'When set to true, the preview will be deleted even if it is in an invalid state to be deleted under normal circumstances. This must be set to true in order to delete a base preview. A locked preview cannot be deleted, even by setting this to true',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: { message: 'Deleting' },
    outputFields: [{ key: 'message' }],
  },
  key: 'delete_preview',
  noun: 'Preview',
  display: {
    label: 'Delete a Preview',
    description: 'Deletes a Preview.',
    hidden: false,
    important: false,
  },
};
