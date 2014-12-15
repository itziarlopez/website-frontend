Spanish Tuition
===============

Uses grunt to build pipeline. 

###Getting Started
Install `node` and `npm`. Once installed, install `grunt-cli`:

 * `sudo npm install -g grunt-cli`

Once installed, type `npm install` to get all dependencies installed.
To build pipeline:

 * `grunt` - will build the dev pipeline
 * `grunt production` - will build the production pipeline (compressing both css and js)

###Useful Commands

 * `grunt clean:all` - will clean ALL intermediate output. You will need to type `npm install` again after this
