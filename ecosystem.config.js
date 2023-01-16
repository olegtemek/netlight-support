module.exports = {
  apps: [
    {
      name: 'SupportNetLightFront',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      port: 9089
    },
    {
      name: 'SupportNetLightBack',
      instances: 'max',
      script: '../backend/index.js'
    }
  ]
}
