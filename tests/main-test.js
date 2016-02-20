/**
 * For loading all "test" cases according to the Karma config - "files".
 *
 */

/**
 * The array of test cases
 *
 * @type {Array}
 */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/\.test\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

/**
 * RequireJS config
 */
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
    },

    shim: {
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});