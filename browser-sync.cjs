// Browser-sync configuration for Magento 2 with Grunt
let docroot = process.env.DDEV_DOCROOT;
let filesdir = process.env.DDEV_FILES_DIR;

if (filesdir === "") {
    filesdir = null
}

module.exports = {
    files: [
        docroot + '/**/*.css',
        docroot + '/**/*.js',
        'app/design/frontend/**/*',
        'app/design/adminhtml/**/*',
        'lib/web/**/*',
    ],

    ignore: [
        'node_modules',
        'vendor',
        'var',
        'generated',
        'pub/static/_cache',
        'pub/static/frontend/**/fonts/**',
        'pub/static/version*/**',
        filesdir
    ],

    open: false,
    ui: false,

    proxy: {
        target: "http://web",
        proxyReq: [
            function (proxyReq) {
                proxyReq.setHeader('Host', '{{ .Hostname }}');
                proxyReq.setHeader('X-Forwarded-Proto', 'https');
                proxyReq.setHeader('X-Forwarded-Port', '443');
            }
        ]
    },

    host: "0.0.0.0",
    port: 3000,
    https: false
};
