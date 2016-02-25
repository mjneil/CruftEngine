// Karma configuration
// Generated on Sat Feb 20 2016 13:01:48 GMT-0600 (Central Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['requirejs', 'traceur', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'cruft/**/*.js', included: false },
      { pattern: 'tests/**/*.test.js', included: false },
      'tests/main-test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'cruft/**/*.js': ['traceur'],
        'tests/**/*.test.js': ['traceur']
    },

    traceurPreprocessor: {
        // options passed to the traceur-compiler
        // see traceur --longhelp for list of options
        options: {
            experimental: true,
            sourceMaps: true,
            modules: 'amd'
        }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
        'karma-requirejs',
        'karma-traceur-preprocessor',
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-phantomjs-launcher'
    ]
  })
}
