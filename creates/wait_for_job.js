const perform = (z, bundle) => {
  setTimeout(() => {
    throw new z.errors.HaltedError('Timeout reached before job completed...');
  }, bundle.inputData.timeout * 60 * 1000);

  const options = {
    url: `${bundle.authData.api_url}/v3/jobs/${bundle.inputData.job}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.token}`,
    },
    redirect: 'manual',
  };

  function retry(parentResolve, parentReject) {
    return new Promise((resolve, reject) => {
      reject = parentReject || reject;
      resolve = parentResolve || resolve;

      z.request(options)
        .then(validateResponse)
        .then((response) => {
          z.console.log('Job completed! Resolving...');
          return resolve(response);
        })
        .catch((err) => {
          if (err === 'retry') {
            z.console.log('Job still in progress! Retrying...');
            retry(resolve, reject);
          } else {
            z.console.error('Job failed! Rejecting...');
            reject(err);
          }
        });
    });
  }

  function validateResponse(response) {
    return new Promise((resolve, reject) => {
      const job = response.json;
      if (typeof job.type === 'undefined' || job.type != 'job') {
        response.throwForStatus();
        reject(z.errors.HaltedError('Unexpected object format'));
      }

      if (!job.result) {
        // Use the 'Retry-After' header if it was given, otherwise wait 10 seconds.
        const t = response.getHeader('Retry-After') || 10;
        z.console.log(`Waiting ${t} seconds before retrying...`);
        setTimeout(reject.bind(null, 'retry'), t * 1000);
      } else if (job.result !== 'success' && !bundle.inputData.ignore_error) {
        reject(job);
      } else {
        resolve(job);
      }
    });
  }

  return retry();
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'job',
        label: 'Job ID',
        type: 'string',
        helpText: 'Enter the Job ID to wait for.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'timeout',
        label: 'Timeout',
        type: 'integer',
        default: '10',
        helpText:
          'The maximum amount of time to wait for the job to complete in minutes. If this is reached before the job completes, the step will fail.',
        choices: [
          { sample: '5', label: '5 minutes', value: '5' },
          { sample: '10', label: '10 minutes', value: '10' },
          { sample: '20', label: '20 minutes', value: '20' },
          { sample: '30', label: '30 minutes', value: '30' },
          { sample: '60', label: '60 minutes', value: '60' },
          { sample: '90', label: '90 minutes', value: '90' },
        ],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'ignore_error',
        label: 'Continue on Job Error',
        type: 'boolean',
        helpText:
          'Set this to true if you would like your Zap to continue even if the job is unsuccessful. *Note: this does not ignore an error due to a timeout above.*',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      progress: 0,
      key: '5e62533313ecdf451f3ca42b',
      target: 'previews',
      action: 'rebuild',
      object: '60ae4cc23e5c6473909df427',
      args: { preview: '60ae4cc23e5c6473909df427', force: false },
      createdAt: '2021-05-27T17:38:34.998Z',
      updatedAt: '2021-05-27T17:39:05.370Z',
      startedAt: '2021-05-27T17:38:35.064Z',
      endedAt: '2021-05-27T17:39:05.329Z',
      message: null,
      result: 'success',
      id: '60afd91a3e5c6411829f1725',
      type: 'job',
      job: '60afd91a3e5c6411829f1725',
      project: '5fc6717502f60b6e8ad324ec',
      repo: '60ad4392cde720fae86f213b',
      preview: '60ae4cc23e5c6473909df427',
    },
    outputFields: [
      { key: 'progress', type: 'integer' },
      { key: 'key' },
      { key: 'target' },
      { key: 'action' },
      { key: 'object' },
      { key: 'args__preview' },
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
  key: 'wait_for_job',
  noun: 'Job',
  display: {
    label: 'Wait for Job',
    description: 'Waits for a Job to complete',
    hidden: false,
    important: false,
  },
};
