#!/usr/bin/env bash

./node_modules/.bin/tslint --fix \
packages/*/src/**/*.{ts,tsx,js,jsx} \
scripts/**/*.{ts,tsx,js,tsx} \
fixtures/*/*.{ts,tsx,js,tsx} \
fixtures/*/*/*.{ts,tsx,js,tsx} \
