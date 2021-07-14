const testAuth = (z, bundle) => {
  const options = {
    url: `${bundle.authData.api_url}/v3/keys`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.token}`,
      'X-TOKEN': bundle.authData.token,
      'X-API-URL': bundle.authData.api_url,
    },
    params: {
      token: bundle.authData.token,
      api_url: bundle.authData.api_url,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    if (response.json.length) {
      return response.json.pop();
    }
  });
};

module.exports = {
  type: 'custom',
  test: testAuth,
  fields: [
    {
      computed: false,
      key: 'api_url',
      required: true,
      label: 'Tugboat API URL',
      type: 'string',
      helpText:
        'This is the URL for the Tugboat API. You can leave this as the default value unless you are using Tugboat On-Premise.',
      default: 'https://api.tugboat.qa',
    },
    {
      computed: false,
      key: 'token',
      required: true,
      label: 'Tugboat Access Token',
      type: 'password',
      helpText:
        'You can generate a Tugboat Access Token by [visiting your profile](https://dashboard.tugboat.qa/profile). Read the [Tugboat documentation](https://docs.tugboat.qa/tugboat-cli/set-an-access-token/) to learn more.',
    },
  ],
  customConfig: {},
  connectionLabel: '{{bundle.inputData.name}}',
};
