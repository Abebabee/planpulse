const path = require('path');

module.exports = {
  // Your webpack configuration settings
  // ...
  watchOptions: {
    ignored: /node_modules/, // Ignore node_modules for performance
    aggregateTimeout: 300,   // Delay before rebuilding
    poll: 1000,              // Check for changes every second
    // Add the 'src' folder to the list of directories to watch
    // Replace 'path/to/src' with the actual path to your src folder
    // You may need to use path.resolve() to resolve the absolute path
    // Example: path.resolve(__dirname, 'src')
    dirs: ['path/to/src'],
  },
  target: 'web',
  resolve: {
    fallback: {
        "crypto": "false",
        "stream": require.resolve("stream-browserify"),
        "timers": require.resolve("timers-browserify"),
        "dns": require.resolve("dns.js"),
        "os": require.resolve("os-browserify/browser"),
        "zlib": require.resolve("browserify-zlib"),
        "http": require.resolve("stream-http")
    }
}
  
};
