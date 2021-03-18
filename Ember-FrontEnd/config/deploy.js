module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    pipeline: {
      activateOnDeploy: true
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';

    ENV.s3 = {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'dev-cs340-bookproject',
      region: 'us-east-2'
    };
    ENV['s3-index'] = {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'dev-cs340-bookproject',
      region: 'us-east-2',
      allowOverwrite: true
    };
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';

    ENV.s3 = {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'cs340-bookproject',
      region: 'us-east-2'
    };
    ENV['s3-index'] = {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'cs340-bookproject',
      region: 'us-east-2',
      allowOverwrite: true
    };
  }

  return ENV;
};