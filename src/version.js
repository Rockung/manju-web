import pkg from '../package.json';

const ManjuWeb = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  license: pkg.license,
  repositoryType: pkg.repository.type,
  repositoryUrl: pkg.repository.url,
};

export { ManjuWeb };
