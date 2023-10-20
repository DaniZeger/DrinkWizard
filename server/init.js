const init = require('./controllers/Init');

// Call the init function here
init.init()
    .then(() => {
        console.log('Initialization completed successfully.');
        process.exit(0); // Exit the process
    })
    .catch((err) => {
        console.error('Initialization failed:', err);
        process.exit(1); // Exit the process with an error status
    });
