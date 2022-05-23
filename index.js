const express = require('express');
const consign = require('consign');

const app =  express();

consign()
    .include("libs/configs.js")
    .then("libs/db.js")
    .then("libs/auth.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);
