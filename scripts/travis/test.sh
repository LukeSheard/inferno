#!/usr/bin/env bash

npm run test:ci

function upload {
  npm run coveralls
}

trap upload EXIT
