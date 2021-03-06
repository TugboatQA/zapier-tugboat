module.exports = {
  operation: {
    perform: {
      url: '{{bundle.authData.api_url}}/v3/projects/{{bundle.inputData.project}}/repos',
      method: 'GET',
      params: {},
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer {{bundle.authData.token}}',
      },
      body: {},
      removeMissingValuesFrom: {},
    },
    inputFields: [
      {
        key: 'project',
        type: 'string',
        dynamic: 'list_projects.project.name',
        label: 'Tugboat Project',
        helpText: 'Select a Project to list the repositories for.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      admins: [],
      autobuild: true,
      autorebuild: true,
      autodelete: true,
      build_timeout: 3600,
      createdAt: '2019-09-17T16:38:49.924Z',
      deploy_public:
        "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCxgtsuIGC+H0YZuJx/jlE66xsyAo8rKtoPJbsNww1R+Upzaw5RLbiasUmvtCmt6dSUERnFgnKXgll+QboZaPMJYo0hbYvuCd/+SxZQAKb9rpTEBP9aKgvHvMHKI1b9WNxtdrN7uKqbhvqALA9tNOD7alSB5tPdw+57n99SDquZ7X4wq4fuoi4hV0cgp5dlvsN0kJPildikYMENZPG7duCJXJSp5nvxUBXsrJYm9b7lQmmA1nYdxP+18CGcJa6Hap39RSJrKQIL9uxWN5QY9DXLNh4l8Hm9AnXNbptuGUXyyAJDpklfuYDQtXEmYXXo6HP/AccKwDKcxo9/pDKzu859'",
      envvars: [],
      git: 'git@github.com:myorg/myrepo.git',
      guests: [],
      id: '5d810c19f6f82083ed65ef03',
      ip_allow: [],
      ip_deny: [],
      name: 'myorg/myrepo',
      owner: '5d9b5bfb52163ce4e1508c07',
      previews: [],
      project: '5d810c19f6f8203d5b65ef01',
      provider: 'bitbucket',
      provider_comment: false,
      provider_config: {},
      provider_deployment: false,
      provider_forks: false,
      provider_status: true,
      quota: 0,
      rebuild_orphaned: false,
      rebuild_stale: false,
      refresh_anchors: true,
      refresh_day: 7,
      refresh_hour: 0,
      registries: [],
      repo: '5d810c19f6f82083ed65ef03',
      size: 458027915,
      ssh_public:
        'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCxgtsuIGC+H0YZuJx/jlE66xsyAo8rKtoPJbsNww1R+Upzaw5RLbiasUmvtCmt6dSUERnFgnKXgll+QboZaPMJYo0hbYvuCd/+SxZQAKb9rpTEBP9aKgvHvMHKI1b9WNxtdrN7uKqbhvqALA9tNOD7alSB5tPdw+57n99SDquZ7X4wq4fuoi4hV0cgp5dlvsN0kJPildikYMENZPG7duCJXJSp5nvxUBXsrJYm9b7lQmmA1nYdxP+18CGcJa6Hap39RSJrKQIL9uxWN5QY9DXLNh4l8Hm9AnXNbptuGUXyyAJDpklfuYDQtXEmYXXo6HP/AccKwDKcxo9/pDKzu859',
      type: 'repo',
      updatedAt: '2019-10-07T18:30:18.725Z',
      users: [],
    },
    outputFields: [
      { key: 'autobuild', type: 'boolean' },
      { key: 'autorebuild', type: 'boolean' },
      { key: 'autodelete', type: 'boolean' },
      { key: 'build_timeout', type: 'integer' },
      { key: 'createdAt', type: 'datetime' },
      { key: 'deploy_id', type: 'integer' },
      { key: 'deploy_public', type: 'string' },
      { key: 'git', label: 'Git URL', type: 'string' },
      { key: 'id', label: 'Repo ID' },
      { key: 'link', label: 'Git repository link' },
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'owner' },
      { key: 'project' },
      { key: 'provider' },
      { key: 'provider_comment', type: 'boolean' },
      { key: 'provider_deployment', type: 'boolean' },
      { key: 'provider_forks', type: 'boolean' },
      { key: 'provider_status', type: 'boolean' },
      { key: 'quota', type: 'integer' },
      { key: 'rebuild_orphaned', type: 'boolean' },
      { key: 'rebuild_stale', type: 'boolean' },
      { key: 'refresh_anchors', type: 'boolean' },
      { key: 'refresh_day', type: 'integer' },
      { key: 'refresh_hour', type: 'integer' },
      { key: 'repo', label: 'Repo ID', type: 'string' },
      { key: 'size', type: 'number' },
      { key: 'ssh_public', label: 'Public SSH Key' },
      { key: 'updatedAt', type: 'datetime' },
      { key: 'webhook' },
    ],
  },
  key: 'list_repos',
  noun: 'Repo',
  display: {
    label: 'List Project Repositories',
    description:
      'Triggers when new repositories are added to a Tugboat project.',
    hidden: false,
    important: false,
  },
};
