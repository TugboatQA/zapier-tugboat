const perform = (z, bundle) => {
  const options = {
    url: `${bundle.authData.api_url}/v3/repos/${bundle.inputData.repo}/previews`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.token}`,
    },
    params: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    return results.filter((preview) => preview.anchor && (!bundle.inputData.ref || preview.ref === bundle.inputData.ref));
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
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'ref',
        label: 'Ref',
        type: 'string',
        required: false,
        list: false,
        helpText: 'Optional. The git ref to find a Base Preview for. This can be a pull request number, branch, tag, or commit hash',
      },
    ],
    sample: {
      state: 'suspended',
      locked: false,
      hits: 571,
      size: 1777181758,
      anchor: true,
      anchor_type: 'repo',
      stale: false,
      visualdiffs: false,
      repo: '60a6603dcde7205bd76bfc27',
      ref: 'main',
      name: 'main',
      sha: 'ee3d5342d66f3f3fb5e6b4b0e34b71dcbcb4d4db',
      base: null,
      provider: 'gitlab',
      provider_id: 'refs/heads/main',
      provider_type: 'branch',
      provider_link: 'https://gitlab.com/tugboatdemo/wordpress/-/tree/main',
      provider_link_sha:
        'https://gitlab.com/tugboatdemo/wordpress/tree/ee3d5342d66f3f3fb5e6b4b0e34b71dcbcb4d4db',
      provider_label: 'main',
      provider_ref: {
        name: 'main',
        commit: {
          id: 'ee3d5342d66f3f3fb5e6b4b0e34b71dcbcb4d4db',
          short_id: 'ee3d5342',
          created_at: '2021-05-20T09:21:30.000-04:00',
          parent_ids: [
            'ef80270685dd08bee99edcd378e2181405506e93',
            'bc9d7ce2fbb99a0f15669e845f4eb860e8f3d424',
          ],
          title:
            'Merge pull request #36 from TugboatDemo/dependabot/npm_and_yarn/docroot/wp-content/themes/twentytwenty/dot-prop-4.2.1',
          message:
            'Merge pull request #36 from TugboatDemo/dependabot/npm_and_yarn/docroot/wp-content/themes/twentytwenty/dot-prop-4.2.1\n\nBump dot-prop from 4.2.0 to 4.2.1 in /docroot/wp-content/themes/twentytwenty',
          author_name: 'james-tugboat',
          author_email: '61875201+james-tugboat@users.noreply.github.com',
          authored_date: '2021-05-20T09:21:30.000-04:00',
          committer_name: 'GitHub',
          committer_email: 'noreply@github.com',
          committed_date: '2021-05-20T09:21:30.000-04:00',
          web_url:
            'https://gitlab.com/tugboatdemo/wordpress/-/commit/ee3d5342d66f3f3fb5e6b4b0e34b71dcbcb4d4db',
        },
        merged: false,
        protected: true,
        developers_can_push: false,
        developers_can_merge: true,
        can_push: true,
        default: true,
        web_url: 'https://gitlab.com/tugboatdemo/wordpress/-/tree/main',
      },
      lasthit: '2021-05-25T00:33:48.134Z',
      createdAt: '2021-05-20T13:30:05.792Z',
      updatedAt: '2021-05-25T01:00:40.059Z',
      build_begin: '2021-05-25T00:32:14.750Z',
      default_service: '60a6645f757146281092e78e',
      url: 'https://main-pedicmtielwrdwg0ejcr8otqkbkdmfom.tugboat.qa',
      build_end: '2021-05-25T00:32:54.338Z',
      suspended: 'ready',
      id: '60a6645d757146fcdc92e775',
      label: 'main',
      preview: '60a6645d757146fcdc92e775',
      type: 'preview',
      project: '5fc6717502f60b6e8ad324ec',
      children: ['60a6a9b5cde72050a06c5c22'],
      services: ['60a6645f7571467c1592e78c', '60a6645f757146281092e78e'],
      mail: [],
      urls: ['https://main-pedicmtielwrdwg0ejcr8otqkbkdmfom.tugboat.qa'],
    },
    outputFields: [
      { key: 'state' },
      { key: 'locked', type: 'boolean' },
      { key: 'hits', type: 'integer' },
      { key: 'size', type: 'integer' },
      { key: 'anchor', type: 'boolean' },
      { key: 'anchor_type' },
      { key: 'stale', type: 'boolean' },
      { key: 'visualdiffs', type: 'boolean' },
      { key: 'repo' },
      { key: 'ref' },
      { key: 'name' },
      { key: 'sha' },
      { key: 'base' },
      { key: 'provider' },
      { key: 'provider_id' },
      { key: 'provider_type' },
      { key: 'provider_link' },
      { key: 'provider_link_sha' },
      { key: 'provider_label' },
      { key: 'provider_ref__name' },
      { key: 'provider_ref__commit__id' },
      { key: 'provider_ref__commit__short_id' },
      { key: 'provider_ref__commit__created_at' },
      { key: 'provider_ref__commit__parent_ids[]0' },
      { key: 'provider_ref__commit__parent_ids[]1' },
      { key: 'provider_ref__commit__parent_ids[]2' },
      { key: 'provider_ref__commit__parent_ids[]3' },
      { key: 'provider_ref__commit__parent_ids[]4' },
      { key: 'provider_ref__commit__parent_ids[]5' },
      { key: 'provider_ref__commit__parent_ids[]6' },
      { key: 'provider_ref__commit__parent_ids[]7' },
      { key: 'provider_ref__commit__parent_ids[]8' },
      { key: 'provider_ref__commit__parent_ids[]9' },
      { key: 'provider_ref__commit__parent_ids[]10' },
      { key: 'provider_ref__commit__parent_ids[]11' },
      { key: 'provider_ref__commit__parent_ids[]12' },
      { key: 'provider_ref__commit__parent_ids[]13' },
      { key: 'provider_ref__commit__parent_ids[]14' },
      { key: 'provider_ref__commit__parent_ids[]15' },
      { key: 'provider_ref__commit__parent_ids[]16' },
      { key: 'provider_ref__commit__parent_ids[]17' },
      { key: 'provider_ref__commit__parent_ids[]18' },
      { key: 'provider_ref__commit__parent_ids[]19' },
      { key: 'provider_ref__commit__parent_ids[]20' },
      { key: 'provider_ref__commit__parent_ids[]21' },
      { key: 'provider_ref__commit__parent_ids[]22' },
      { key: 'provider_ref__commit__parent_ids[]23' },
      { key: 'provider_ref__commit__parent_ids[]24' },
      { key: 'provider_ref__commit__parent_ids[]25' },
      { key: 'provider_ref__commit__parent_ids[]26' },
      { key: 'provider_ref__commit__parent_ids[]27' },
      { key: 'provider_ref__commit__parent_ids[]28' },
      { key: 'provider_ref__commit__parent_ids[]29' },
      { key: 'provider_ref__commit__parent_ids[]30' },
      { key: 'provider_ref__commit__parent_ids[]31' },
      { key: 'provider_ref__commit__parent_ids[]32' },
      { key: 'provider_ref__commit__parent_ids[]33' },
      { key: 'provider_ref__commit__parent_ids[]34' },
      { key: 'provider_ref__commit__parent_ids[]35' },
      { key: 'provider_ref__commit__parent_ids[]36' },
      { key: 'provider_ref__commit__parent_ids[]37' },
      { key: 'provider_ref__commit__parent_ids[]38' },
      { key: 'provider_ref__commit__parent_ids[]39' },
      { key: 'provider_ref__commit__title' },
      { key: 'provider_ref__commit__message' },
      { key: 'provider_ref__commit__author_name' },
      { key: 'provider_ref__commit__author_email' },
      { key: 'provider_ref__commit__authored_date' },
      { key: 'provider_ref__commit__committer_name' },
      { key: 'provider_ref__commit__committer_email' },
      { key: 'provider_ref__commit__committed_date' },
      { key: 'provider_ref__commit__web_url' },
      { key: 'provider_ref__merged' },
      { key: 'provider_ref__protected' },
      { key: 'provider_ref__developers_can_push' },
      { key: 'provider_ref__developers_can_merge' },
      { key: 'provider_ref__can_push' },
      { key: 'provider_ref__default' },
      { key: 'provider_ref__web_url' },
      { key: 'lasthit' },
      { key: 'createdAt' },
      { key: 'updatedAt' },
      { key: 'build_begin' },
      { key: 'default_service' },
      { key: 'url' },
      { key: 'build_end' },
      { key: 'suspended' },
      { key: 'id' },
      { key: 'label' },
      { key: 'preview' },
      { key: 'type' },
      { key: 'project' },
      { key: 'children[]0' },
      { key: 'children[]1' },
      { key: 'children[]2' },
      { key: 'children[]3' },
      { key: 'children[]4' },
      { key: 'children[]5' },
      { key: 'children[]6' },
      { key: 'children[]7' },
      { key: 'children[]8' },
      { key: 'children[]9' },
      { key: 'children[]10' },
      { key: 'children[]11' },
      { key: 'children[]12' },
      { key: 'children[]13' },
      { key: 'children[]14' },
      { key: 'children[]15' },
      { key: 'children[]16' },
      { key: 'children[]17' },
      { key: 'children[]18' },
      { key: 'children[]19' },
      { key: 'children[]20' },
      { key: 'children[]21' },
      { key: 'children[]22' },
      { key: 'children[]23' },
      { key: 'services[]0' },
      { key: 'services[]1' },
      { key: 'services[]2' },
      { key: 'services[]3' },
      { key: 'services[]4' },
      { key: 'services[]5' },
      { key: 'services[]6' },
      { key: 'services[]7' },
      { key: 'services[]8' },
      { key: 'services[]9' },
      { key: 'services[]10' },
      { key: 'services[]11' },
      { key: 'services[]12' },
      { key: 'services[]13' },
      { key: 'services[]14' },
      { key: 'services[]15' },
      { key: 'services[]16' },
      { key: 'services[]17' },
      { key: 'services[]18' },
      { key: 'services[]19' },
      { key: 'services[]20' },
      { key: 'services[]21' },
      { key: 'services[]22' },
      { key: 'services[]23' },
      { key: 'urls[]0' },
      { key: 'urls[]1' },
      { key: 'urls[]2' },
      { key: 'urls[]3' },
      { key: 'urls[]4' },
      { key: 'urls[]5' },
      { key: 'urls[]6' },
      { key: 'urls[]7' },
      { key: 'urls[]8' },
      { key: 'urls[]9' },
      { key: 'urls[]10' },
      { key: 'urls[]11' },
      { key: 'urls[]12' },
      { key: 'urls[]13' },
      { key: 'urls[]14' },
      { key: 'urls[]15' },
      { key: 'urls[]16' },
      { key: 'urls[]17' },
      { key: 'urls[]18' },
      { key: 'urls[]19' },
      { key: 'urls[]20' },
      { key: 'urls[]21' },
      { key: 'urls[]22' },
      { key: 'urls[]23' },
      { key: 'urls[]24' },
      { key: 'urls[]25' },
      { key: 'urls[]26' },
      { key: 'urls[]27' },
      { key: 'urls[]28' },
      { key: 'urls[]29' },
      { key: 'urls[]30' },
      { key: 'urls[]31' },
      { key: 'urls[]32' },
      { key: 'urls[]33' },
      { key: 'urls[]34' },
      { key: 'urls[]35' },
      { key: 'urls[]36' },
      { key: 'urls[]37' },
      { key: 'urls[]38' },
      { key: 'urls[]39' },
      { key: 'urls[]40' },
      { key: 'urls[]41' },
      { key: 'urls[]42' },
      { key: 'urls[]43' },
      { key: 'urls[]44' },
      { key: 'urls[]45' },
      { key: 'urls[]46' },
      { key: 'urls[]47' },
      { key: 'urls[]48' },
      { key: 'urls[]49' },
      { key: 'urls[]50' },
      { key: 'urls[]51' },
      { key: 'urls[]52' },
      { key: 'urls[]53' },
      { key: 'urls[]54' },
      { key: 'urls[]55' },
    ],
  },
  key: 'find_base_previews',
  noun: 'Base Preview',
  display: {
    label: 'Find Base Previews',
    description: 'Find a Base Preview',
    hidden: false,
    important: false,
  },
};
