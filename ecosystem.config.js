module.exports = {
    apps: [
        {
            name: 'bl',        // Name of the application
            script: 'ors.js',           // Entry point of your application (adjust if different)
            instances: 1,               // Number of instances to run (set as needed)
            exec_mode: 'fork',          // Use 'cluster' for clustering mode
            watch: false,               // Enable if you want PM2 to watch for file changes
            env: {
                PORT: 8089              // Port your app should listen on
            }
        }
    ]
};




