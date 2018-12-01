const convict = require('convict');

// Define a schema
const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'NODE_IP',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3030,
    env: 'NODE_PORT',
  },
  secureToken: {
    doc: 'Our token',
    format: String,
    default: 'MINT_TOKEN',
    env: 'MINT_TOKEN',
  },
  db: {
    url: {
      doc: 'Database hostname',
      format: String,
      default: 'mongodb://localhost:27017/news',
      env: 'DB_URL',
    },
  },
});

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
