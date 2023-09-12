module.exports = {
  apps: [
    {
      name: 'jasonz-website-front',
      cwd: '/www/jasonz-website-front',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
 