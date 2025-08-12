require('dotenv').config({ path: '.env.deploy', override: true });

module.exports = {
  apps: [
    {
      name: 'api',
      script: './dist/app.js',
      env: { NODE_ENV: 'production' },
    }
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref:  process.env.DEPLOY_REF || 'origin/main',
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH || '/home/nest-study/mesto/backend',

      'pre-setup': 'mkdir -p {{path}}/shared',
      'pre-deploy-local': 'scp -o StrictHostKeyChecking=no ./backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared/.env',

      'post-deploy': [
        'mkdir -p ../shared && if [ -f ../shared/.env ]; then cp ../shared/.env ./.env; fi',
        'npm ci',
        'npm run build',
        'pm2 reload ecosystem.config.cjs --only api || pm2 start ecosystem.config.cjs --only api',
        'pm2 save'
      ].join(' && ')
    }
  }
};
