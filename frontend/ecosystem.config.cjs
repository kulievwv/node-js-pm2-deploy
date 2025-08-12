require('dotenv').config({ path: '.env.deploy', override: true });

module.exports = {
  apps: [],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,       /
      host: process.env.DEPLOY_HOST,
      ref:  process.env.DEPLOY_REF || 'origin/main',
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH || '/home/nest-study/mesto/frontend',

      'pre-setup': 'mkdir -p {{path}}/shared',

      'post-deploy': [
        'npm ci',
        'NODE_OPTIONS=--openssl-legacy-provider npm run build'
      ].join(' && ')
    }
  }
};