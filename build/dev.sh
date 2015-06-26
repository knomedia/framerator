#!/usr/bin/env bash

http-server ./www &
webpack --config webpack.config.js --colors --progress --watch --devtool inline-source-map
