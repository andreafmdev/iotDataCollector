module.exports = {
  apps: [
    {
      name: 'Iot-Demo-Backend',
      script: './dist/index.js',
      interpreter: '',
      env_development: {
        NODE_ENV: 'development',
        MONGO_URI_TEST: 'mongodb+srv://freddidev:zgx3UhuAP5gxPjMQ@iotcluster1.7lgk76w.mongodb.net/?retryWrites=true&w=majority&',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        MONGO_URI_TEST: 'mongodb+srv://freddidev:zgx3UhuAP5gxPjMQ@iotcluster1.7lgk76w.mongodb.net/?retryWrites=true&w=majority&',
        PORT: 3000
      },
      watch: ['src', 'ecosystem.config.js'], // Watch these directories/files

      restart_delay: 10000, // 10 secondi tra i tentativi di riavvio
      max_restarts: 5 // Numero massimo di tentativi di riavvio

    }
  ]
};
