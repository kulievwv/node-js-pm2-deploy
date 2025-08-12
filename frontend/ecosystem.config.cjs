require('dotenv').config({ path: '.env.deploy', override: true });

module.exports = {
  apps: [],  // для статического фронта процесс не нужен

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,       // nest-study
      host: process.env.DEPLOY_HOST,       // 158.160.154.79
      ref:  process.env.DEPLOY_REF || 'origin/main',
      repo: process.env.DEPLOY_REPO,       // git@github.com:kulievwv/node-js-pm2-deploy.git
      path: process.env.DEPLOY_PATH || '/home/nest-study/mesto/frontend',

      'pre-setup': 'mkdir -p {{path}}/shared',

      // CRA на Node 20+/22 иногда падает — даём legacy-провайдер для OpenSSL
      'post-deploy': [
        'npm ci',
        'NODE_OPTIONS=--openssl-legacy-provider npm run build'
      ].join(' && ')
    }
  }
};