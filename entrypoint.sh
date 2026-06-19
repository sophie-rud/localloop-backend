#!/bin/sh
set -e

npx prisma migrate deploy

node app.js